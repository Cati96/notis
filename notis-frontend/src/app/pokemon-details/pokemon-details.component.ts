import { Component, OnInit } from "@angular/core";
import { PokemonService } from "../pokemon.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "pokemon-details",
  templateUrl: "./pokemon-details.component.html",
  styleUrls: ["./pokemon-details.component.scss"]
})
export class PokemonDetailsComponent implements OnInit {
  private pokemon: any;
  constructor(private svc: PokemonService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getPokemonDetails();
  }

  getPokemonDetails(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.svc.getPokemonById(id).subscribe(data => {
      this.pokemon = data;
    });
  }
}
