/**
 * TournamentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    getTeamTournaments: async (req, res) => {
        const id = req.params.id;
        if (!id) return res.status(400).json({ message: "The team id is required." })

        const tournaments = await Tournament.find({ team_id: id });

        return res.status(200).json(tournaments);
    },

    createTournament: async (req, res) => {
        const [tournamentExists] = await Tournament.find({ name: req.body.name, active: true });
        if (tournamentExists) return res.status(400).json({ message: "The name exists." })

        await Tournament.create(req.body, (error, tournament) => {
            if (error) {
                if (error.code == "E_VALIDATION") {
                    return res.status(400).json({ message: `The param ${Object.keys(error.invalidAttributes)[0]} is required.` })
                } else return res.status(400).json({ message: "Oops, something went wrong." })
            } else return res.ok("Done");
        })
    },


    getTournament: async (req, res) => {
        const _id = req.params.tournament_id;
        if (!_id) return res.status(400).json({ message: "The param id is required." })

        const [tournament] = await Tournament.find({ id: _id });

        return res.status(200).json(tournament);
    },


    updateTournament: async (req, res) => {
        const _id = req.params.tournament_id;
        if (!_id) return res.status(400).json({ message: "The param id is required." })

        const [tournamentExists] = await Tournament.find({ id: _id });
        if (!tournamentExists) return res.status(404).json({ message: "The tournament doesn't exists." });

        const updatedTournament = await Tournament.update({ id: _id }, req.body).fetch();

        return res.status(200).json(updatedTournament);
    },


    deleteTournament: async (req, res) => {
        const _id = req.params.tournament_id;
        if (!_id) return res.status(400).json({ message: "The param id is required." })

        const tournament = await Tournament.find({ id: _id });
        if (!tournament) return res.status(404).json({ message: "The tournament doesn't exists." });

        console.log("T", tournament)
        await Tournament.destroy(tournament);

        return res.ok("Done");
    },

};

