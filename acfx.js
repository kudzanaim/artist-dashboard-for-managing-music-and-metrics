var y_rhy_deis_ = function(){
    // 1. instatiate history object & router
    window.RouterObject = Router;
    window.History_ = RouterObject.history_object;
    window.Pager_ = new Pager();
    RouterObject.initHistory("leave");

    // undeclared global variables for listeners
    window.dataChangeListener = ''; window.chatChangeListener = ''; window.messageListener = '';
    window.activityChangeListener = '';
    
    // 1. instatiate App State
    window.State = new Store.constructor();
    
    // 3. On AppLoad, instatiate Navigation and render Navigation
    window.navigation = new Navigation.constructor();
    State.navigation.currentState = navigation.getNavItems();
    
    // 4. instatiate Firebase DB for songs
    window.fireInit_ = (window.fireInit_ == undefined)? new initFirebase.constructor() : window.fireInit_;
    window.firebase_artists = (window.firebase_artists == undefined) ? fireInit_.initArtistsDB() : window.firebase_artists;
    window.firebase_storage = (window.firebase_storage == undefined) ? fireInit_.initStorage() : window.firebase_storage;

    // Chenge URL
    history.replaceState( {} , '', '/open.artistcorner/sign-in' );
    
}