import { Component, ComponentRef, viewChild, ViewContainerRef } from "@angular/core";
import { WidgetComponent } from "./widget/widget.component";
@Component({
  selector: "app-root",
  standalone: true,
  template: `
    <img class="logo" src="./logo.svg" alt="Decoded Frontend" />
    <h1 class="page-title">ngContentOutlet Demo</h1>
    
    <main id="content">
      <ng-container #container></ng-container>
      <section class="toolbar">
        <button (click)="createComponent()" class="create">Create Component</button>
        <button (click)="destroyComponent()" class="destroy">Destroy Component</button>
      </section>
    </main>
  `,
})
export class AppComponent {
  container = viewChild('container', {read: ViewContainerRef})
  #componentRef?: ComponentRef<WidgetComponent>
  
  createComponent() {
    this.#componentRef = this.container()?.createComponent(WidgetComponent);
  }
  destroyComponent() {
    this.#componentRef?.destroy();
  }
}
