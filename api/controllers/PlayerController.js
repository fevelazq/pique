/**
 * PlayerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { FIRST_TEAM, WOMEN_TEAM, GOALKEEPER, DEFENDER, MIDFIELDERS, FORWARDS } = require("../../config/constants");

module.exports = {

    getPlayers: async (req, res) => {
        const team_id = req.params.id;
        const mobile = req.query.mobile;
        const skip = req.query.skip ? req.query.skip : 0;
        const limit = req.query.limit;

        if (!team_id) return res.status(500).json({ message: "The team id is required." });

        const total = await Player.count({ team_id: team_id });

        const _players = await Player.find({ team_id: team_id })
            .skip(skip).limit(limit ? limit : total);

        if (mobile) {
            let players = [];

            const main = _players.filter(player => player.sub_team === FIRST_TEAM);
            const women = _players.filter(player => player.sub_team === WOMEN_TEAM);

            if (!main.length || !women.length) return res.status(200).json(players);

            //FIRST TEAM BY POSITIONS
            const main_GP = main.filter(player => player.position === GOALKEEPER).sort((a, b) => (a.position_number > b.position_number ? 1 : -1));
            const main_DF = main.filter(player => player.position === DEFENDER).sort((a, b) => (a.position_number > b.position_number ? 1 : -1));
            const main_MD = main.filter(player => player.position === MIDFIELDERS).sort((a, b) => (a.position_number > b.position_number ? 1 : -1));
            const main_DL = main.filter(player => player.position === FORWARDS).sort((a, b) => (a.position_number > b.position_number ? 1 : -1));
            //WOMEN TEAM BY POSITIONS
            const women_GP = women.filter(player => player.position === GOALKEEPER).sort((a, b) => (a.position_number > b.position_number ? 1 : -1));
            const women_DF = women.filter(player => player.position === DEFENDER).sort((a, b) => (a.position_number > b.position_number ? 1 : -1));
            const women_MD = women.filter(player => player.position === MIDFIELDERS).sort((a, b) => (a.position_number > b.position_number ? 1 : -1));
            const women_DL = women.filter(player => player.position === FORWARDS).sort((a, b) => (a.position_number > b.position_number ? 1 : -1));

            players.push(
                {
                    name: "Primer equipo",
                    scheme: [
                        { name: "Porteros", players: [...main_GP] },
                        { name: "Defensas", players: [...main_DF] },
                        { name: "Medios", players: [...main_MD] },
                        { name: "Delanteros", players: [...main_DL] }
                    ]
                },
                {
                    name: "Femenil",
                    scheme: [
                        { name: "Porteros", players: [...women_GP] },
                        { name: "Defensas", players: [...women_DF] },
                        { name: "Medios", players: [...women_MD] },
                        { name: "Delanteros", players: [...women_DL] }
                    ]
                }
            );

            return res.status(200).json(players);
        }

        return res.status(200).json(_players);
    },

    getTotal: async (req, res) => {
        let total = 0;

        if (!req.params.id) return res.status(500).json({ message: 'The team_id is required.' });

        total = await Player.count({ team_id: req.params.id, active: true });

        return res.status(200).json({ total: total });
    },

    createPlayer: async (req, res) => {
        await Player.create(req.body, (error, player) => {
            if (error) {
                if (error.code == "E_VALIDATION") {
                    return res.status(400).json({ message: `The param ${Object.keys(error.invalidAttributes)[0]} is required.` })
                } else return res.status(400).json({ message: "Oops, something went wrong." })
            } else return res.ok();
        })
    },

    getPlayer: async (req, res) => {
        const team_id = req.params.id;
        const player_id = req.params.player_id;

        const [player] = await Player.find({ id: player_id, team_id: team_id });

        if (!player) return res.status(400).json({ success: false, message: "No player found." });

        return res.status(200).json(player);
    },

    updatePlayer: async (req, res) => {
        const player_id = req.params.player_id;

        if (!player_id) return res.status(400).send({ message: "The player_id is required." });

        const [playerExists] = await Player.find({ id: player_id });
        if (!playerExists) return res.status(404).json({ message: "Player not found." })

        const updatedPlayer = await Player.update({ id: player_id }, req.body).fetch();

        return res.status(200).json(updatedPlayer);
    },

    deletePlayer: async (req, res) => {
        const player_id = req.params.player_id;

        if (!player_id) return res.status(400).send({ message: "The player_id is required." });

        const [player] = await Player.find({ id: player_id });

        if (!player) return res.status(400).send({ message: "Player not found." });

        player.active = false;

        return res.status(200);
    }

};

