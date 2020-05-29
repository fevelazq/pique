/**
 * VideoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

    getTeamVideos: async (req, res) => {
        let skip = req.query.skip ? req.query.skip : 0;
        let limit = req.query.limit ? req.query.limit : 10;

        const _id = req.params.id;
        if (!_id) return res.status(400).json({ message: "The team id is required." })

        const videos = await Video.find({ team_id: _id })
            .skip(skip)
            .limit(limit);

        return res.status(200).json(videos);
    },


    getTotalVideos: async (req, res) => {
        const total = await Video.count({ team_id: req.params.id });

        return res.status(200).json({ total });
    },


    createVideo: async (req, res) => {
        await Video.create(req.body, (error, video) => {
            if (error) {
                if (error.code == "E_VALIDATION") {
                    return res.status(400).json({ message: `The param ${Object.keys(error.invalidAttributes)[0]} is required.` })
                } else return res.status(400).json({ message: "Oops, something went wrong." })
            } else return res.ok();
        })
    },


    getVideo: async (req, res) => {
        const _id = req.params.video_id;
        if (!_id) return res.status(400).json({ message: "The param id is required." })

        const [video] = await Video.find({ id: _id });

        return res.status(200).json(video);
    },


    updateVideo: async (req, res) => {
        const _id = req.params.video_id;
        if (!_id) return res.status(400).json({ message: "The param id is required." })

        const [videoExists] = await Video.find({ id: _id });
        if (!videoExists) return res.status(404).json({ message: "The video doesn't exists." });

        const updatedVideo = await Video.update({ id: _id }, req.body).fetch();

        return res.status(200).json(updatedVideo);
    },


    deleteVideo: async (req, res) => {
        const _id = req.params.video_id;
        if (!_id) return res.status(400).json({ message: "The param id is required." })

        const [video] = await Video.find({ id: _id });
        if (!video) return res.status(404).json({ message: "The video doesn't exists." });

        await Video.destroy(video);

        return res.ok("Done");
    }

};
