import { Component, ComponentRef, inject, TemplateRef, Type, viewChild, ViewContainerRef } from "@angular/core";
import { WidgetComponent } from "./widget/widget.component";
import { NgComponentOutlet } from "@angular/common";
import { WeatherContentComponent } from "./widget/weather-content.component";
@Component({
  selector: "app-root",
  standalone: true,
  template: `
    <img class="logo" src="./logo.svg" alt="Decoded Frontend" />
    <h1 class="page-title">ngContentOutlet Demo</h1>
    <ng-template #contentTpl>
      <app-weather-content />
    </ng-template>
    <main id="content">
      <ng-container
        [ngComponentOutlet]="component"
        [ngComponentOutletInputs]="componentInputs"
        [ngComponentOutletContent]="content"></ng-container>
      <section class="toolbar">
        <button (click)="createComponent()" data-testingId="create" class="create">Create Component</button>
        <button (click)="destroyComponent()" data-testingId="destroy" class="destroy">Destroy Component</button>
      </section>
    </main>
  `,
  imports: [NgComponentOutlet, WeatherContentComponent]
})
export class AppComponent {
  vcr = inject(ViewContainerRef);
  contentTpl = viewChild<TemplateRef<unknown>>('contentTpl')
  protected content: Node[][] = [];
  protected component: Type<WidgetComponent> | null = null;
  protected componentInputs = {
    title: 'Weather',
    description: 'Currently in Vienna'
  }
   
  createComponent() {
    this.content = [
      this.vcr.createEmbeddedView(this.contentTpl()!).rootNodes
    ]
    this.component = WidgetComponent;
  }
  destroyComponent() {
    this.component = null;
    this.vcr.clear();
  }
}
