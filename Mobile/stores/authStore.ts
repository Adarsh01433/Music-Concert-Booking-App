
import {create} from "zustand"
import * as SecureStore from 'expo-secure-store';
import {jwtDecode} from "jwt-decode"
import axios from "axios";
import { API_BASE } from "@/constants";

interface AuthState {
    accessToken : string | null,
    refreshToken : string | null,
    user : {id : string; email : string ; profile?:{name?:string}} | null;
    isLoading : boolean
    setTokens:(access: string, refresh : string)=> Promise<void>;
    setUser : (user : AuthState['user'])=> void;
    logOut : ()=> Promise<void>;
    setLoading : (loading : boolean)=> void
};


export const useAuthStore = create<AuthState>((set)=>({
    accessToken : null,
    refreshToken : null,
    user : null,
    isLoading : true,
    setTokens:async(access, refresh)=> {
       await SecureStore.setItemAsync("accessToken", access),
       await SecureStore.setItemAsync("refreshToken", refresh),
       set({accessToken : access , refreshToken : refresh})

    },
    setUser:(user)=> set({user}),
    logOut:async()=> {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        set({accessToken : null, refreshToken : null , user : null})
    },
    setLoading:(loading)=>set({isLoading : loading})
}));

 export const loadTokens = async()=> {
    useAuthStore.getState().setLoading(true);

    try {
        const access = await SecureStore.getItemAsync("accessToken")
        const refresh = await SecureStore.getItemAsync("refreshToken");

        if(access && refresh){
            const decoded = jwtDecode<{exp : number}>(access);
            const isExpired = decoded.exp * 1000 <Date.now();

            if(isExpired){
                try {
                    const response = await axios.post(`${API_BASE}/auth/refresh`, {refreshToken :refresh})
                const {accessToken : newAccess , refreshTOken : newRefresh}= response.data;
                await useAuthStore.getState().setTokens(newAccess, newRefresh);
                } catch (refreshErr) {
                    console.error("Refresh failed", refreshErr);
                    await useAuthStore.getState().logOut();
                } 
            } else {
                    useAuthStore.getState().setTokens(access, refresh)
                }
        }
    } catch (err) {
        console.error("Load tokens error", err);
    } finally{
        useAuthStore.getState().setLoading(false)
    }
 }