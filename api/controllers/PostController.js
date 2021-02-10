/**
 * PostController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    getTeamPosts: async (req, res) => {
        let skip = req.query.skip ? req.query.skip : 0;
        let limit = req.query.limit ? req.query.limit : 10;

        const _id = req.params.team_id;
        if (!_id) return res.status(400).json({ message: "The team id is required." })

        const posts = await Post.find({ team_id: _id })
            .skip(skip)
            .limit(limit);

        return res.status(200).json(posts);
    },


    getTotalPosts: async (req, res) => {
        const total = await Post.count({ team_id: req.params.team_id });

        return res.status(200).json({ total });
    },


    createPost: async (req, res) => {
        const _body = {
            team_id: req.params.team_id,
            active: true,
            ...req.body
        }

        await Post.create(_body)
            .fetch()
            .exec(function (error, post) {
                if (error) {
                    if (error.code == "E_VALIDATION") {
                        return res.status(400).json({ message: `The param ${Object.keys(error.invalidAttributes)[0]} is required.` })
                    } else return res.status(400).json({ message: "Oops, something went wrong." })
                } else return res.status(200).json(post);
            })
    },


    getPost: async (req, res) => {
        const _id = req.params.post_id;
        if (!_id) return res.status(400).json({ message: "The param id is required." })

        const [post] = await Post.find({ id: _id });

        return res.status(200).json(post);
    },


    updatePost: async (req, res) => {
        const _id = req.params.post_id;
        if (!_id) return res.status(400).json({ message: "The param id is required." })

        const [postExists] = await Post.find({ id: _id });
        if (!postExists) return res.status(404).json({ message: "The post doesn't exists." });

        const updatedPost = await Post.update({ id: _id }, req.body).fetch();

        return res.status(200).json(updatedPost);
    },


    deletePost: async (req, res) => {
        const _id = req.params.post_id;
        if (!_id) return res.status(400).json({ message: "The param id is required." })

        const [post] = await Post.find({ id: _id });
        if (!post) return res.status(404).json({ message: "The post doesn't exists." });

        await Post.destroy(post);

        return res.ok("Done");
    }

};
