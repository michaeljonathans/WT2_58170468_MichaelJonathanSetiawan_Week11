import { Component, OnInit } from "@angular/core";

import { PokemonService } from "./pokemon.service";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: "ns-pokemons",
    templateUrl: "./pokemon.component.html"
})
export class PokemonComponent implements OnInit {
    //variabel pokemons untuk menampung seluruh pokemon dari database secara berkala, namun tidak bisa auto-update. Jika mau auto-update, gunakan observable
    pokemons=[];
    //variabel pokemons$ bisa di-observe. Artinya setiap isinya berubah, maka akan tercermin ke HTML-nya.
    pokemons$: BehaviorSubject<Array<any>>;
    //counter untuk load more pokemon
    idxstart=0;

    constructor(private ps: PokemonService) {
        //ketika pertama dijalankan, kosongkan isi pokemon$
        this.pokemons$ = new BehaviorSubject([]);
    }

    ngOnInit(): void {
        this.ps.getPokemons().subscribe((response: any) => {
            //masukkan seluruh pokemon yang baru didapat ke dalam variabel pokemons
            this.pokemons.push( ... response.results);
            //update observable pokemons$
            this.pokemons$.next(this.pokemons);
        });
    }

    loadMore() {
        //tambakan counter untuk load 20 pokemon berikutnya
        this.idxstart+=20;

        this.ps.getPokemons(this.idxstart).subscribe((response: any) => {
            //masukkan seluruh pokemon yang baru didapat ke dalam variabel pokemons
            this.pokemons.push( ... response.results);
            //update observable pokemons$
            this.pokemons$.next(this.pokemons);
            }
        );
    }
}
