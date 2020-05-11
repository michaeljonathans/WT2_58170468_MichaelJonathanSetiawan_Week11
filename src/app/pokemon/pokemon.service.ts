import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class PokemonService {
    baseUrl = `https://pokeapi.co/api/v2`;

    constructor(private http: HttpClient) {

    }

    getPokemons(idxstart=0) {
        //kalau idxstart dioper, maka gunakan untuk menge-load pokemon dari index tersebut
        if(idxstart) {
            return this.http.get(`${this.baseUrl}/pokemon?offset=${idxstart}`);
        }
        //jika idxstart tidak dioper, artinya program baru dijalankan. Load sampai 20 pokemon pertama
        else {
            return this.http.get(`${this.baseUrl}/pokemon`);
        }
    }

    getPokemon(name: string) {
        //mendapatkan satu pokemon
        return this.http.get(`${this.baseUrl}/pokemon/${name}`);
    }
}
