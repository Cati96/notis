import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PokemonListComponent } from "../pokemon-list/pokemon-list.component";
import { PokemonDetailsComponent } from "../pokemon-details/pokemon-details.component";

const appRoutes: Routes = [
  {
    path: "pokemons",
    component: PokemonListComponent
  },
  {
    path: "",
    redirectTo: "/pokemons",
    pathMatch: "full"
  },
  {
    path: "pokemon/:id",
    component: PokemonDetailsComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}