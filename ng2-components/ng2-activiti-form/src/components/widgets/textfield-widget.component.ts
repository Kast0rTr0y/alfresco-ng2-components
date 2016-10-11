/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ElementRef } from '@angular/core';
import { WidgetComponent } from './widget.component';

export abstract class TextFieldWidgetComponent extends WidgetComponent {

    protected elementRef: ElementRef;

    constructor(elementRef: ElementRef) {
        super();
        this.elementRef = elementRef;
    }

    // Overrides base implementation
    setupMaterialComponents(handler: any): boolean {
        // workaround for MDL issues with dynamic components
        if (handler) {
            handler.upgradeAllRegistered();
            if (this.elementRef && this.hasValue()) {
                let el = this.elementRef.nativeElement;
                let container = el.querySelector('.mdl-textfield');
                if (container) {
                    container.MaterialTextfield.change(this.field.value.toString());
                }
            }
            return true;
        }
        return false;
    }

}
