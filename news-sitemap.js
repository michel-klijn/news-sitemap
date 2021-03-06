/*
    Copyright (C) 2015  PencilBlue, LLC

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

module.exports = function(pb) {
    
    /**
    * NewsSitemap - Adds a Google News sitemap to the site.
    *
    * @author Blake Callens <blake@pencilblue.org>
    * @copyright 2014 PencilBlue, LLC
    */
    function NewsSitemap(){}

    /**
    * Called when the application is being installed for the first time.
    *
    * @param cb A callback that must be called upon completion.  cb(err, result).
    * The result is ignored
    */
    NewsSitemap.onInstall = function(cb) {
        cb(null, true);
    };

    /**
    * Called when the application is uninstalling this plugin.  The plugin should
    * make every effort to clean up any plugin-specific DB items or any in function
    * overrides it makes.
    *
    * @param cb A callback that must be called upon completion.  cb(err, result).
    * The result is ignored
    */
    NewsSitemap.onUninstall = function(cb) {
        cb(null, true);
    };

    /**
    * Called when the application is starting up. The function is also called at
    * the end of a successful install. It is guaranteed that all core PB services
    * will be available including access to the core DB.
    *
    * @param cb A callback that must be called upon completion.  cb(err, result).
    * The result is ignored
    */
    NewsSitemap.onStartup = function(cb) {
        cb(null, true);
    };

    /**
    * Called when the application is gracefully shutting down.  No guarantees are
    * provided for how much time will be provided the plugin to shut down.
    *
    * @param cb A callback that must be called upon completion.  cb(err, result).
    * The result is ignored
    */
    NewsSitemap.onShutdown = function(cb) {
        cb(null, true);
    };

    //exports
    return NewsSitemap;
};
