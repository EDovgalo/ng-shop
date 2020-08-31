import {ApplicationRef, ComponentFactoryResolver, Injectable, Injector} from '@angular/core';
import {ToasterComponent} from '../components/toaster/toaster.component';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private injector: Injector,
              private appRef: ApplicationRef,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  showMessage(message, isWarning?: boolean): void {
    const target = document.getElementById('toaster');
    const factory = this.componentFactoryResolver.resolveComponentFactory(ToasterComponent);
    const popupComponentRef = factory.create(this.injector, [], target);
    this.appRef.attachView(popupComponentRef.hostView);
    popupComponentRef.instance.message = message;
    popupComponentRef.instance.isWarning = isWarning;
    this.destroyComponent(popupComponentRef);
  }

  private destroyComponent(componentRef): void {
    setTimeout(() => {
      componentRef.destroy();
      this.appRef.detachView(componentRef.hostView);
    }, 3000);
  }

}
