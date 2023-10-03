const {Song}= require('../models/song');
const {Playlist}= require('../models/playlist');


const search= async(req,res) =>{
    try{
        const searchQuery =req.query.search;
        console.log(searchQuery)
        if(searchQuery !==""){
            const songs= await Song.find({ name:{$regex:searchQuery, $options: "i"}}).limit(10);
            const playlists= await Playlist.find({ name:{$regex:searchQuery, $options: "i"}}).limit(10);

            const result={songs, playlists};
            res.status(200).json({data:result})
        }else{
            res.status(200).json({})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }

}

module.exports={search};