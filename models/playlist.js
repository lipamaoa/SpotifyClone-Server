const{Schema, model} = require('mongoose');
const Joi = require('joi');

const objectID = require('mongoose').Types.ObjectId;

const playlistSchema = new Schema({
    name: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    desc:{type: String},
    songs:{type: Array, default: []},
    img: {type: String},
});

const validate=(playlist)=>{
    const schema = Joi.object({
        name: Joi.string().required(),
        user: Joi.string().required(),
        desc:Joi.string().allow(""),
        songs:Joi.array().items(Joi.string()),
        img: Joi.string().allow(""),
    });
    return schema.validate(playlist);
}
const Playlist = model('Playlist', playlistSchema);

module.exports = {Playlist, validate};