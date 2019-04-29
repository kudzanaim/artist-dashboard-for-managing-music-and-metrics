

// c. Application State store
var Store = {
    constructor: function(){
        this.navigation = {
            currentState: undefined,
            state: true
        };
        this.uploads = {
            previewPane: {
                artwork_wrk_file: undefined,
                text_meta_length: 0
            },
            editState: false 
        };  
        this.totals = {
            albumsUploaded: 0,
            singlesUploaded:0,
            totalStreams:0,
            totalRoyalties:0,
            royaltybreakDown: {
                weekly:0,
                monthly:0,
                yearly:0
            },
            streamBreakDown: {
                daily:0,
                weekly:0,
                monthly:0,
                yearly:0
            },
            loadState: 0
        }
        this.searchState = "undefined";
        this.currentAlbumInEditOpen = "undefined",
        this.activities = [],

        this.chatListener =  function(){
            var chat_length = State.user.inbox.length;
            // listen for chat length changes
            chatChangeListener = setInterval( function(){
                if( chat_length != State.user.inbox.length ){
                    State.intervalKiller();
                    State.setListener();
                    return State.dbRefUpdate()
                }
            },100 );
        },
        this.messageListener =  function(){
            // store current state in session storage so its immutable to new change
            sessionStorage.setItem("inbox", JSON.stringify( State.user.inbox) );
            var inbox = JSON.parse(sessionStorage.getItem("inbox"));
    
            // listen for new messages
            messageListener = setInterval(function()  {
                inbox.map( function(chat, index_cht){
                    if( 
                        chat != "appended here" &&  State.user.inbox[index_cht].messages.length != inbox[index_cht].messages.length
                    ){
                        // kill listener && re-set listener
                        State.intervalKiller();
                        State.setListener();
                        
                        return State.dbRefUpdate() 
                    }
                })
            }, 500);
        },
        this.datalistener = function(){
            // get current state of object and store in variables
            var email_ = State.user.accountDetails.email;           var password_ = State.user.accountDetails.password;     var phoneNumber_ = State.user.accountDetails.phoneNumber;
            var city_ = State.user.address.city;                    var country_ = State.user.address.country ;             var streetAddr_ = State.user.address.streetAddress;
            var artistName_ = State.user.artistName;                var firstName_ = State.user.firstName;                  var lastName_ = State.user.lastName;
            var paymnt_firstName = State.user.payments.current.firstName;        var paymnt_lastName = State.user.payments.current.lastName;
            var paymnt_Service_ = State.user.payments.current.paymentService;    var paymnt_phoneNumber = State.user.payments.current.phoneNumber;
            var biography_ = State.user.data.biography; var profilePic = State.user.profileImageUrl;
            
            // listen for changes
            dataChangeListener = setInterval( function(){
                if(
                    State.user.accountDetails.email != email_ || State.user.accountDetails.password != password_ || State.user.data.biography != biography_ ||
                    State.user.accountDetails.phoneNumber != phoneNumber_ || State.user.address.city != city_ || State.user.address.country != country_ || 
                    State.user.address.streetAddress != streetAddr_ || State.user.artistName != artistName_ || State.user.firstName != firstName_ || 
                    State.user.lastName != lastName_ || State.user.payments.current.firstName != paymnt_firstName || State.user.payments.current.lastName != paymnt_lastName || 
                    State.user.payments.current.paymentService != paymnt_Service_ || State.user.payments.current.phoneNumber != paymnt_phoneNumber || 
                    State.user.profileImageUrl != profilePic
                ){  
                    // kill listener
                    clearInterval( dataChangeListener);
                    // alert user
                    State.dbRefUpdate()
                    // re-call listener
                    State.setListener();
                }
            },100);
        },
        this.intervalKiller = function(){
            var killer = function(){
                clearInterval( messageListener );
                clearInterval( chatChangeListener );
                clearInterval( dataChangeListener );
                clearInterval( activityChangeListener );
            }
            return killer()
        },
        // activity listener
        this.activityListener = function(){
    
            // Get State of activities length
            var activityLength = State.activities.length;
            
            // listen for changes
            activityChangeListener = setInterval(function()  {
                if( activityLength != State.activities.length ){
                    // kill listener
                    clearInterval( activityChangeListener);
                    // Set App activities State to User Object
                    State.user.activities = State.activities;
                    // alert user
                    State.dbRefUpdate()
                    // re-call listener
                    State.setListener();
                }
            }, 100);
        
        },
        this.setListener = function(){
            // console.clear();
            var setListenerData = function(){
                State.datalistener();
                State.messageListener();
                State.chatListener();
                State.activityListener();
            }
            return setListenerData()
        },
        this.contactSupport = function(subject, message_){
            // push message to chats
            var date = new Date().getTime();
            var chatLength = State.user.inbox.length;
            State.user.inbox.push({
                chat_id:chatLength, subject: subject, date: date, recipient:"Support", messages:[
                    {message_id:0, sender:"Me", message: message_}
                ]
            })
            // push message to new support messages
            var artist = State.user.artistName;
            var email = State.user.accountDetails.email;
            var phone = State.user.accountDetails.phoneNumber
            var sender = {artistName:artist, email: email, phoneNumber:phone};
    
            // Send Message to Dash Support
            // State.user.toSupport.push(
            //     { sender:sender, subject:subject, message:message_, date: date }
            // )
        },
        this.dbRefUpdate = function(){
            // push new State to User Ref
            var userKey = State.userKey;
            var new_state = State.user;
            return firebase_artists.database().ref(userKey).set(new_state)
        },
        // get stats and set to State
        this.getStats = function(){
            var getTotals = function(){
                State.getAlbumsUploaded();
                State.getsinglesUploaded();
                State.getTotalStreams();    
            }
            return getTotals()
        },
        this.getAlbumsUploaded = function(){
    
                // Get artist Name
                var artist = State.user.artistName;
                
                // Query this artists albums
                return firebase.database().ref("/albums").orderByChild("Artist").startAt(artist).endAt(artist+"\uf8ff").once("value").then( function(snap){
                    var album = ( snap.val() != null ) ? Object.values( snap.val() ) : [];
                    album.length = ( album.length != 0 ) ? album.length-1 : 0;
                        return State.totals.albumsUploaded = album.length
                })
        },
        this.getsinglesUploaded = function(){
                // Get artist Name
                var artist = State.user.artistName;
        
                // Query this artists albums
                return firebase.database().ref("/songs").orderByChild("artist").startAt(artist).endAt(artist+"\uf8ff").once("value").then( function(snap){
                    var singles = ( snap.val() != null ) ? Object.values( snap.val() ) : [];
                    singles.length = (singles.length != 0) ? singles.length-1 : 0;
                        return State.totals.singlesUploaded = singles.length
                })
        },
        this.getTotalStreams = function(){
    
                // Get artist Name
                var artist = State.user.artistName;
        
                // Query this artists albums
                return firebase.database().ref("/songs").orderByChild("artist").startAt(artist).endAt(artist+"\uf8ff").once("value").then( function(snap){
                    var singles = ( snap.val() != null ) ? Object.values( snap.val() ) : [];
                    singles.length = (singles.length != 0) ? singles.length - 1 : 0;
                    return singles
                })
                // MAp thru all singles and get stream count
                .then( function(singles){
                    var length = singles.length;
                    singles.map( function(song, index){
                        var streams = song.streamCount;
                        var f = function(){
                            State.totals.totalStreams += streams;
                            State.totals.totalRoyalties += streams*0.02;
                            if(index == (length-1) ){
                                State.totals.loadState = 1;
                            }
                        }
                        return f()
                    })
        
                })
    
        },
        this.addActivity = function( activity, songname, album){
            
            // Push activity function
            var push_activity = function(){
                // Get date
                var date = State.dateFormat();
        
                // Switch thru activity types
                switch (activity) {
                    case "bio": //done
                        // Create Activity object
                        var activity_object = { activity: "Biography Updated", date: date, style:"activityCont_ ripple" };
                        return State.activities.unshift( activity_object )
                    case "personal": //done
                        // Create Activity object
                        var activity_object = { activity: "Personal Details Changed", date: date, style:"activityCont_ ripple" };
                        return State.activities.unshift( activity_object )
                    case "contact": //done
                        // Create Activity object
                        var activity_object = { activity: "Contact Details Updated", date: date, style:"activityCont_ ripple" };
                        return State.activities.unshift( activity_object )
                    case "payment": //done
                        // Create Activity object
                        var activity_object = { activity: "Payment Details Changed", date: date, style:"activityCont_ ripple" };
                        return State.activities.unshift( activity_object )
                    case "song_upload": //done
                        // Create Activity object
                        var activity_object = { activity: `Uploaded Song: "`+songname+`"`, date: date, style:"activityCont_ ripple" };
                        return State.activities.unshift( activity_object )
                    case "album_upload": //done
                        // Create Activity object
                        var activity_object = { activity: `Uploaded Album: "`+album+`"`, date: date, style:"activityCont_ ripple" };
                        return State.activities.unshift( activity_object )
                    case "song_edit": //done
                        // Create Activity object
                        var activity_object = { activity: `Edited Song: "`+ songname +`"`, date: date, style:"activityCont_ ripple" };
                        return State.activities.unshift( activity_object )
                    case "album_edit": //done
                        // Create Activity object
                        var activity_object = { activity: `Edited Album: "`+album+`"`, date: date, style:"activityCont_ ripple" };
                        return State.activities.unshift( activity_object )
                    case "song_deleted": //done
                        // Create Activity object
                        var activity_object = { activity: `Deleted Song: "`+songname+`"`, date: date, style:"activityCont_ ripple" };
                        return State.activities.unshift( activity_object )
                    case "album_deleted": //done
                        // Create Activity object
                        var activity_object = { activity: `Deleted Album: "`+ album +`"`, date: date, style:"activityCont_ ripple" };
                        return State.activities.unshift( activity_object )
                }
            }
            
            // correct objetc if length at 51
            if( State.activities.length >= 51){
                State.activities.splice((State.activities.length-2), 1);
                return push_activity()
            }
            else{
                return push_activity()
            }
    
        },
        this.dateFormat = function(){
            var date_convert = new Date();
            var date = date_convert.getDate() +"/"+ (date_convert.getMonth()+1)+"/"+date_convert.getFullYear();
            return date
        },
        this.getActivities = function(){
            var activities = this.user.activities;
            return State.activities = activities
        }
    }

}

window.Store = Store;