/**
 * TeamController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
	createTeam: async (req, res) => {
		const [teamExists] = await Team.find({ name: req.body.name });
		if (teamExists) return res.status(400).json({ message: "The team name exists." });

		await Team.create(req.body)
			.fetch()
			.exec(function (error, team) {
				if (error) {
					if (error.code == "E_VALIDATION") {
						return res
							.status(400)
							.json({ message: `The param ${Object.keys(error.invalidAttributes)[0]} is required.` });
					} else return res.status(400).json({ message: "Oops, something went wrong." });
				}
				return res.status(200).json(team);
			});
	},

	getTeam: async (req, res) => {
		const { team_id } = req.params;
		if (!team_id) return res.status(400).json({ message: "The team_id is required." });

		const [team] = await Team.find({ id: team_id });

		return res.status(200).json(team);
	},

	updateTeam: async (req, res) => {
		const { team_id } = req.params;
		if (!team_id) return res.status(400).json({ message: "The team_id is required." });

		const [teamExists] = await Team.find({ id: team_id });
		if (!teamExists) return res.status(404).json({ message: "The team doesn't exists." });

		const updatedTeam = await Team.update({ id: team_id }, req.body).fetch();

		return res.status(200).json(updatedTeam);
	},

	deleteTeam: async (req, res) => {
		const { team_id } = req.params;
		if (!team_id) return res.status(400).json({ message: "The team_id is required." });

		const [team] = await Team.find({ id: team_id });
		if (!team) return res.status(404).json({ message: "The team doesn't exists." });

		await Team.destroy(team);

		return res.ok();
	}
};
