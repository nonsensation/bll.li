import { browser } from '$app/environment'
import { writable, get } from 'svelte/store'

export const localStore = ( key, defaultValue ) => persistantStore( key, defaultValue, localStorage )

export const sessionStore = ( key, defaultValue ) =>
    persistantStore( key, defaultValue, sessionStorage )

function persistantStore( key, defaultValue, storage )
{
    const store = writable( defaultValue )

    if( !browser ) return store

    const storedValueStr = storage.getItem( key )

    if( storedValueStr != null ) store.set( JSON.parse( storedValueStr ) )

    store.subscribe( val =>
    {
        if( [ null, undefined ].includes( val ) ) storage.removeItem( key )
        else storage.setItem( key, JSON.stringify( val ) )
    } )

    window.addEventListener( 'storage', () =>
    {
        const storedValueStr = storage.getItem( key )

        if( storedValueStr == null ) return

        const localValue = JSON.parse( storedValueStr )

        if( localValue !== get( store ) ) store.set( localValue )
    } )

    return store
}

