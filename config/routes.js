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

  // CRUD ===== CREATE // READ // UPDATE // DELETE //
  "POST /team": {
    controller: "TeamController",
    action: "createTeam",
    cors: true
  },

  "GET /team/:team_id": {
    controller: "TeamController",
    action: "getTeam",
    cors: true
  },

  "PUT /team/:team_id": {
    controller: "TeamController",
    action: "updateTeam",
    cors: true
  },

  "DELETE /team/:team_id": {
    controller: "TeamController",
    action: "deleteTeam",
    cors: true
  },

  "GET /team/:team_id/match": {
    controller: "MatchController",
    action: "getMatches",
    cors: true
  },

  "POST /team/:team_id/match": {
    controller: "MatchController",
    action: "createMatch",
    cors: true
  },

  "GET /team/:team_id/match/:match_id": {
    controller: "MatchController",
    action: "getMatch",
    cors: true
  },

  "PUT /team/:team_id/match/:match_id/": {
    controller: "MatchController",
    action: "updateMatch",
    cors: true
  },

  "DELETE /team/:team_id/match/:match_id/": {
    controller: "MatchController",
    action: "deleteMatch",
    cors: true
  },

  "GET /team/:team_id/match/current": {
    controller: "MatchController",
    action: "getCurrentMatch",
    cors: true
  },

  "GET /team/:team_id/post/": { 
    controller: "PostController",
    action: "getTeamPosts",
    cors: true
  },

  "GET /team/:team_id/post/total": {
    controller: "PostController",
    action: "getTotalPosts",
    cors: true
  },

  "POST /team/:team_id/post/": {
    controller: "PostController",
    action: "createPost",
    cors: true
  },

  "GET /team/:team_id/post/:post_id": {
    controller: "PostController",
    action: "getPost",
    cors: true
  },

  "PUT /team/:team_id/post/:post_id": {
    controller: "PostController",
    action: "updatePost",
    cors: true
  },

  "DELETE /team/:team_id/post/:post_id": {
    controller: "PostController",
    action: "deletePost",
    cors: true
  },

  "GET /team/:team_id/video/": {
    controller: "VideoController",
    action: "getTeamVideos",
    cors: true
  },

  "GET /team/:team_id/video/total": {
    controller: "VideoController",
    action: "getTotalVideos",
    cors: true
  },

  "POST /team/:team_id/video/": {
    controller: "VideoController",
    action: "createVideo",
    cors: true
  },

  "GET /team/:team_id/video/:video_id": {
    controller: "VideoController",
    action: "getVideo",
    cors: true
  },

  "PUT /team/:team_id/video/:video_id": {
    controller: "VideoController",
    action: "updateVideo",
    cors: true
  },

  "DELETE /team/:team_id/video/:video_id": {
    controller: "VideoController",
    action: "deleteVideo",
    cors: true
  },

  "GET /team/:team_id/tournament": {
    controller: "TournamentController",
    action: "getTeamTournaments",
    cors: true
  },

  "POST /team/:team_id/tournament": {
    controller: "TournamentController",
    action: "createTournament",
    cors: true
  },

  "GET /tournament/:tournament_id": {
    controller: "TournamentController",
    action: "getTournament",
    cors: true
  },

  "PUT /tournament/:tournament_id": {
    controller: "TournamentController",
    action: "updateTournament",
    cors: true
  },

  "DELETE /team/:team_id/tournament/:tournament_id": {
    controller: "TournamentController",
    action: "deleteTournament",
    cors: true
  },

  "GET /team/:team_id/player/": {
    controller: "PlayerController",
    action: "getPlayers",
    cors: true
  },

  "GET /team/:team_id/player/total": {
    controller: "PlayerController",
    action: "getTotal",
    cors: true
  },

  "POST /team/:team_id/player/": {
    controller: "PlayerController",
    action: "createPlayer",
    cors: true
  },

  "GET /team/:team_id/player/:player_id": {
    controller: "PlayerController",
    action: "getPlayer",
    cors: true
  },

  "PUT /team/:team_id/player/:player_id": {
    controller: "PlayerController",
    action: "updatePlayer",
    cors: true
  },

  "DELETE /team/:team_id/player/:player_id": {
    controller: "PlayerController",
    action: "deletePlayer",
    cors: true
  }

};
