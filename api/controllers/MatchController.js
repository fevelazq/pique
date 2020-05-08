/**
 * MatchController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const moment = require('moment');

module.exports = {

    createMatch: async (req, res) => {
        const [local] = await Team.find({ id: req.body.local_team });
        const [visitor] = await Team.find({ id: req.body.visitor_team });

        if (!local) return res.status(400).json({ message: "Oops, no local team found." });
        if (!visitor) return res.status(400).json({ message: "Oops, no visitor team found." });

        const params = {
            local_team: local,
            visitor_team: visitor,
            team_id: req.body.team_id,
            date: req.body.date,
            global_date: req.body.global_date,
            tournament: req.body.tournament,
            place: req.body.place,
            active: req.body.active
        }

        await Match.create(params, (error, match) => {
            if (error) {
                if (error.code == "E_VALIDATION") {
                    return res.status(400).json({ message: `The param ${Object.keys(error.invalidAttributes)[0]} is required.` });
                } else {
                    console.log("error creating match", error)
                    return res.status(400).json({ message: "Oops, something went wrong." });
                }
            } else return res.ok("Done", match);
        });
    },


    getMatch: async (req, res) => {
        const [match] = await Match.find({ id: req.params.match_id, active: true });
        if (!match) return res.status(404).json({ message: "The match doesn't exists." });

        // set if is the current match
        let isCurrent = null;
        if (!!match.global_date) {
            const _date = String(match.global_date);
            let _matchDate = _date.indexOf("T") != -1 ? _date.split("T")[0] + "T00:00:00" : _date + "T00:00:00";
            _matchDate = moment(_matchDate).format("YYYYMMDD");
            const dateNow = moment().format("YYYYMMDD");
            if (_matchDate >= dateNow) {
                isCurrent = match;
                if (match.id == isCurrent.id) match.current = true;
            }
        }

        return res.status(200).json(match);
    },

    getCurrentMatch: async (req, res) => {
        //TODO: INSERT A FEW MATCHES AND TEST
        const team_id = req.params.id;
        if (!team_id) return res.status(400).json({ message: "The team id is required." });

        const matches = await Match.find({ team_id: team_id, active: true });

        let match = null;
        for (let i = 0, len = matches.length; i < len; i++) {
            const _match = matches[i]

            if (!!_match.global_date) {
                let _date = String(_match.global_date)
                let _matchDate = _date.indexOf('T') != -1 ? (_date.split('T')[0] + 'T00:00:00') : (_date + 'T00:00:00')
                _matchDate = moment(_matchDate).format('YYYYMMDD')
                let dateNow = moment().format('YYYYMMDD')
                if (_matchDate >= dateNow) {
                    match = _match
                    break;
                }
            }
        }

        return res.status(200).json(match);
    },


    updateMatch: async (req, res) => {
        const _id = req.params.match_id;

        const [matchExists] = await Match.find({ id: _id, active: true });
        if (!matchExists) return res.status(404).json({ message: "The match doesn't exists." });

        const updatedMatch = await Match.update({ id: _id }, req.body).fetch();

        return res.status(200).json(updatedMatch);
    },


    getTeamMatches: async (req, res) => {
        const team_id = req.params.id;
        if (!team_id) return res.status(400).json({ message: "The team_id is required." });

        const matches = await Match.find({ team_id: team_id, active: true });

        return res.status(200).json(matches);
    },


    deleteMatch: async (req, res) => {
        const [match] = await Match.find({ id: req.params.match_id, active: true });
        if (!match) return res.status(404).json({ message: "The match doesn't exists." });

        await Match.destroy(match);

        return res.ok("Done");
    }

};

