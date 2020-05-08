/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  "POST /team/": {
    controller: "TeamController",
    action: "createTeam",
    cors: true
  },

  "GET /team/:id": {
    controller: "TeamController",
    action: "getTeam",
    cors: true
  },

  "PUT /team/:id": {
    controller: "TeamController",
    action: "updateTeam",
    cors: true
  },

  "DELETE /team/:id": {
    controller: "TeamController",
    action: "deleteTeam",
    cors: true
  },

  "GET /team/:id/match": {
    controller: "MatchController",
    action: "getTeamMatches",
    cors: true
  },

  "POST /team/:id/match": {
    controller: "MatchController",
    action: "createMatch",
    cors: true
  },

  "GET /team/:id/match/:match_id": {
    controller: "MatchController",
    action: "getMatch",
    cors: true
  },

  "PUT /team/:id/match/:match_id/": {
    controller: "MatchController",
    action: "updateMatch",
    cors: true
  },

  "DELETE /team/:id/match/:match_id/": {
    controller: "MatchController",
    action: "deleteMatch",
    cors: true
  }

};
