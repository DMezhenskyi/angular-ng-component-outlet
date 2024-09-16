import { TestBed } from "@angular/core/testing"
import { AppComponent } from "./app.component"
import { By } from "@angular/platform-browser";
import { WidgetComponent } from "./widget/widget.component";
import { WeatherContentComponent } from "./widget/weather-content.component";

describe(`AppComponent`, () => {
  it(`should properly create component`, () => {
    // setup
    const {fixture, createDynamicallyWidget} = setup()
    // action
    createDynamicallyWidget()
    // assertion
    const widget = fixture.debugElement.query(By.directive(WidgetComponent))
    const title = widget.query(By.css('[data-testingId="title"]'))
    const subTitle = widget.query(By.css('[data-testingId="sub-title"]'))
    const content = widget.query(By.directive(WeatherContentComponent))

    expect(widget).toBeTruthy();
    expect(title.nativeElement.innerText).toBe('Weather');
    expect(subTitle.nativeElement.innerText).toMatch(/Currently in/);
    expect(content).toBeTruthy();
    
  })
  it(`should properly destroy component`, () => {
    // setup
    const {fixture, createDynamicallyWidget} = setup()
    createDynamicallyWidget();
    // action
    const destroyBtn = fixture.debugElement.query(By.css('[data-testingId="destroy"]'))
    destroyBtn.triggerEventHandler('click')
    fixture.detectChanges();

    // assertion
    const widget = fixture.debugElement.query(By.directive(WidgetComponent))
    const content = fixture.debugElement.query(By.directive(WeatherContentComponent))
    expect(widget).toBeNull();
    expect(content).toBeNull();
  })
})

function setup() {
  const fixture = TestBed.createComponent(AppComponent);
  const createDynamicallyWidget = () => {
    const createBtn = fixture.debugElement.query(By.css('[data-testingId="create"]'))
    // action
    createBtn.triggerEventHandler('click');
    fixture.detectChanges();
  }
  return {
    fixture,
    createDynamicallyWidget
  }
}