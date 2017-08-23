import { Injectable } from '@angular/core';

@Injectable()
export class Translations {

  private _model: { [key: string]: any };

  constructor() {
    this._model = {};
  }

  get model() {
    return this._model;
  }

  set model(model: { [key: string]: any }) {
    this._model = model;
  }
}
