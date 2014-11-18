/*
	Copyright (C) 2014  PencilBlue, LLC

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
* Google News sitemap
*/

function NewsSitemap(){}

var ArticleService = require(path.join(DOCUMENT_ROOT, '/include/service/entities/article_service')).ArticleService;

//inheritance
util.inherits(NewsSitemap, pb.BaseController);

//constants
var PARALLEL_LIMIT = 2;

NewsSitemap.prototype.render = function(cb) {
	var self = this;
	var dao   = new pb.DAO();
	var today = new Date();

	var options = {
		where: {
			publish_date: {$lte: today},
			draft: {$ne: 1}
		},
		select: {
			publish_date: 1,
			headline: 1,
			sub_heading: 1,
			article_topics: 1,
			meta_keywords: 1,
			meta_desc: 1,
			meta_title: 1
		}
	}

	dao.q('article', options, function(err, articles) {
		self.processObjects(articles, function(err, urls) {
			self.ts.registerLocal('urls', new pb.TemplateValue(urls, false));
			self.ts.load('xml_feeds/news_sitemap', function(err, content) {
				var data = {
					content: content,
					headers: {
						'Access-Control-Allow-Origin': '*'
					}
				};
				cb(data);
			});
		});
	});
};

NewsSitemap.prototype.processObjects = function(objArray, cb) {
	var self = this;
	var ts   = new pb.TemplateService(this.ls);

	var tasks = pb.utils.getTasks(objArray, function(objArray, i) {
		return function(callback) {
			ArticleService.getMetaInfo(objArray[i], function(metaKeywords, metaDescription, metaTitle) {
				ts.registerLocal('url', '/article/' + objArray[i].url);
				ts.registerLocal('publish_date', self.getPublishDate(objArray[i].publish_date));
				ts.registerLocal('headline', metaTitle);
				ts.registerLocal('keywords', metaKeywords);
				ts.load('xml_feeds/news_sitemap/url', callback);
			});
		};
	});
	async.parallelLimit(tasks, PARALLEL_LIMIT, function(err, results) {
		cb(err, results.join(''));
	});
};

NewsSitemap.prototype.getPublishDate = function(date) {
	var month = date.getMonth() + 1;
	if(month < 10) {
		month = '0' + month;
	}
	var day = date.getDate();
	if(day < 10) {
		day = '0' + day;
	}

	return date.getFullYear() + '-' + month + '-' + day;
};

NewsSitemap.getRoutes = function(cb) {
	var routes = [
		{
			method: 'get',
			path: '/news_sitemap',
			auth_required: false,
			content_type: 'application/xml'
		}
	];
	cb(null, routes);
};

//exports
module.exports = NewsSitemap;
