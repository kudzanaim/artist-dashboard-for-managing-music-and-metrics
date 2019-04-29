
// a. Initialize firebase
var initFirebase = {
    constructor: function(){
        // Meta
        window._sqls_tfr = window.location;
        var _u_ = `https://us-central1-strmamedia.cloudfunctions.net/config`;
        var o = JSON.stringify(_sqls_tfr);

        // Req D
        $.post(_u_, o, function(_d_, _st_){
            firebase.initializeApp(_d_.sc);
            firebase_artists = firebase.initializeApp(_d_.sa, "firebase_artists");
            firebase_storage = firebase.initializeApp(_d_.sm, "firebase_storage");
        })
    }
}


// Navigation Click Handler
window.navClicked = function(e) {
    return navigation.navClicked(e);
}
// songUpload handler
window.uploadSong = function(param){

    var upload_type = $(param).find(".uploadtxt").text();

    switch( upload_type){

        // if Single Upload
        case "UPLOAD SINGLE":
            return  Uploads.uploadSingle(upload_type)
        // if Album Upload
        case "UPLOAD ALBUM":
            return  Uploads.uploadAlbum(upload_type);
    }
    
}


window.initFirebase = initFirebase;