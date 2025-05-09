// ES module: local storage cache and settings
var prefix = 'mt_';
var dataAge = document.getElementsByTagName('html')[0].getAttribute('data-age');
var LocalStorage = {
	age: parseInt( dataAge )
};
LocalStorage.getItem = function( key ) {
	return JSON.parse( localStorage.getItem( prefix+key ) );
};
LocalStorage.setItem = function( key, value ) {
	localStorage.setItem( prefix+key, JSON.stringify(value) );
};
LocalStorage.removeItem = function( key ) {
	localStorage.removeItem( prefix+key );
};
LocalStorage.clear = function() {
	localStorage.clear();
};
LocalStorage.getCache = function( key ) {
	return LocalStorage.getItem( 'cache_'+key );
};
LocalStorage.setCache = function( key, value ) {
	LocalStorage.setItem( 'cache_'+key, value );
};
LocalStorage.removeCache = function( key ) {
	LocalStorage.removeItem( 'cache_'+key );
};
var cacheKey = new RegExp( '(^'+prefix+'cache_.*|^'+prefix+'Offset.*|^'+prefix+'Width.*)' );
LocalStorage.clearCache = function() {
	var key, keys = [];
	for( var i = 0; i < localStorage.length; ++i ) {
		key = localStorage.key( i );
		if( key.match( cacheKey ) !== null ) {
			keys.push( key );
		}
	}
	keys.forEach( function( key ) {
		localStorage.removeItem( key );
	} );
};
LocalStorage.getSetting = function( key, defaultSetting ) {
	var value = LocalStorage.getItem( 'setting_'+key );
	return (value === null)? defaultSetting : value;
};
LocalStorage.setSetting = function( key, value ) {
	LocalStorage.setItem( 'setting_'+key, value );
};
LocalStorage.removeSetting = function( key ) {
	LocalStorage.removeItem( 'setting_'+key );
};
var settingsKey = new RegExp( '^'+prefix+'setting_.*' );
LocalStorage.clearSettings = function() {
	var key, keys = [];
	for( var i = 0; i < localStorage.length; ++i ) {
		key = localStorage.key( i );
		if( key.match( settingsKey ) !== null ) {
			keys.push( key );
		}
	}
	keys.forEach( function( key ) {
		localStorage.removeItem( key );
	} );
};

// Clear out the cache if the app's age has changed
var cacheAge = LocalStorage.getItem( 'cacheAge' );
if( cacheAge === null ) { cacheAge = 0; }
if( cacheAge < LocalStorage.age ) {
	LocalStorage.clearCache();
	LocalStorage.setItem( 'cacheAge', LocalStorage.age );
}
export default LocalStorage;
