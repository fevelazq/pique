/**
 * TeamController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    createTeam: async (req, res) => {
        const [teamExists] = await Team.find({ name: req.body.name, active: true });

        if (teamExists) return res.status(400).json({ message: "The name exists." })

        await Team.create(req.body, (error, team) => {
            if (error) {
                if (error.code == "E_VALIDATION") {
                    return res.status(400).json({ message: `${Object.keys(error.invalidAttributes)[0]} is required.` })
                } else {
                    console.log("\n\n[ERROR] on creating team, INFO: ", error)
                    return res.status(400).json({ message: "Oops, something went wrong." })
                }
            } else return res.ok("Done");
        })
    },


    getTeam: async (req, res) => {
        const _id = req.params.id;

        if (!_id) return res.status(400).json({ message: "The param id is required." })

        const [team] = await Team.find({ id: _id, active: true });

        return res.status(200).json(team);
    },


    getAllTeams: async (req, res) => {
        const teams = await Team.find();

        return res.status(200).json(teams);
    },


    updateTeam: async (req, res) => {
        const _id = req.params.id;
        const [team] = await Team.find({ id: _id, active: true });

        if (!team) return res.status(404).json({ message: "The team doesn't exists." });

        const updatedTeam = await Team.update({ id: _id }, req.body).fetch();

        return res.status(200).json(updatedTeam);
    },


    deleteTeam: async (req, res) => {
        const [team] = await Team.find({ id: req.params.id, active: true });

        if (!team) return res.status(404).json({ message: "The team doesn't exists." });

        await Team.destroy(team);

        return res.ok("Done");
    },

};

