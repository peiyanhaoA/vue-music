import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import { shuffle } from '../common/js/util'
import {saveSearch, deleteSearch, clearSearch} from 'common/js/cache'

function findIndex (list, song) {
    return list.findIndex((item) => {
        return item.id === song.id
    })
}

export const selectPlay = ({commit, state}, {list, index}) => {
    commit(types.SET_SEQUENCE_LIST, list)
    if(state.mode === playMode.random){
        let randomList = shuffle(list)
        commit(types.SET_PLAYLIST, randomList)
        index = findIndex(randomList, list[index])
    }else{
        commit(types.SET_PLAYLIST, list)
    }
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_FULL_SCREEN, true)
}

export const randomPlay = ({commit}, {list}) => {
    commit(types.SET_PLAY_MODE, playMode.random)
    commit(types.SET_SEQUENCE_LIST, list)
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_FULL_SCREEN, true)
}

export const insterSong = ({commit, state}, song) => {
    let playlist = state.playList.slice()
    let squenceList = state.squenceList.slice()
    let currentIndex = state.currentIndex
    // 记录当前歌曲
    let currentSong = playlist[currentIndex]
    // 查找当前列表中是否有带插入歌曲并返回其索引
    let fpIndex = findIndex(playlist, song)
    // 因为是插入歌曲，所以索引+1
    currentIndex++
    // 插入这首歌曲到当前索引位置
    playlist.splice(currentIndex, 0, song)
    // 如果已经包含这首歌
    if(fpIndex > -1){
        // 如果当前插入的序号大于列表中的序号
        if(currentIndex > fpIndex){
            playlist.splice(fpIndex, 1)
            currentIndex--
        }else{
            playlist.splice(fpIndex + 1, 1)
        }
    }

    let currentSIndex = findIndex(squenceList, currentSong) + 1

    let fsIndex = findIndex(squenceList, song)

    squenceList.splice(currentSIndex, 0, song)
    if(fsIndex > -1){
        if(currentSIndex > fsIndex){
            squenceList.splice(fsIndex, 1)
        }else{
            squenceList.splice(fsIndex + 1, 1)
        }
    }

    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_SEQUENCE_LIST, squenceList)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_FULL_SCREEN, true)
}


export const saveSearchHistory = ({commit}, query) => {
    commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}


export const deleteSearchHistory = ({commit}, query) => {
    commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = ({commit}) => {
    commit(types.SET_SEARCH_HISTORY, clearSearch())
}