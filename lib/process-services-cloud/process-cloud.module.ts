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

import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule, TRANSLATION_PROVIDER } from '@alfresco/adf-core';

import { MaterialModule } from './material.module';
import { HelloCloudModule } from './hello';
import { TaskFiltersCloudModule } from './task-filters';
import { TaskFilterService } from './task-filters/services/task-filter.service';

export function providers() {
    return [
        TaskFilterService
    ];
}

@NgModule({
    imports: [
        CoreModule.forChild(),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HelloCloudModule,
        TaskFiltersCloudModule
    ],
    providers: [
        ...providers(),
        {
            provide: TRANSLATION_PROVIDER,
            multi: true,
            useValue: {
                name: 'adf-process-services-cloud',
                source: 'assets/adf-process-services-cloud'
            }
        }
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HelloCloudModule,
        TaskFiltersCloudModule
    ]
})
export class ProcessCloudModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ProcessCloudModule,
            providers: [
                ...providers(),
                {
                    provide: TRANSLATION_PROVIDER,
                    multi: true,
                    useValue: {
                        name: 'adf-process-services-cloud',
                        source: 'assets/adf-process-services-cloud'
                    }
                }
            ]
        };
    }

    static forChild(): ModuleWithProviders {
        return {
            ngModule: ProcessCloudModuleLazy
        };
    }
}

@NgModule({
    imports: [
        CoreModule.forChild(),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HelloCloudModule,
        TaskFiltersCloudModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HelloCloudModule,
        TaskFiltersCloudModule
    ]
})
export class ProcessCloudModuleLazy {}