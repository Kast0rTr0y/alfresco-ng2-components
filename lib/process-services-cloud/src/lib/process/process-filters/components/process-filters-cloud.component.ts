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

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ProcessFilterCloudService } from '../services/process-filter-cloud.service';
import { ProcessFilterCloudModel } from '../models/process-filter-cloud.model';
import { TranslationService } from '@alfresco/adf-core';
import { FilterParamsModel } from '../../../task/task-filters/models/filter-cloud.model';
@Component({
    selector: 'adf-cloud-process-filters',
    templateUrl: './process-filters-cloud.component.html',
    styleUrls: ['process-filters-cloud.component.scss']
})
export class ProcessFiltersCloudComponent implements OnChanges {

    /** (required) The application name */
    @Input()
    appName: string;

    /** (optional) The filter to be selected by default */
    @Input()
    filterParam: FilterParamsModel;

    /** (optional) The flag hides/shows icon against each filter */
    @Input()
    showIcons: boolean = false;

    /** Emitted when a filter is selected/clicked */
    @Output()
    filterClick: EventEmitter<ProcessFilterCloudModel> = new EventEmitter<ProcessFilterCloudModel>();

    /** Emitted when filters are loaded successfully */
    @Output()
    success: EventEmitter<any> = new EventEmitter<any>();

    /** Emitted when any error occurs while loading the filters */
    @Output()
    error: EventEmitter<any> = new EventEmitter<any>();

    filters$: Observable<ProcessFilterCloudModel[]>;

    currentFilter: ProcessFilterCloudModel;

    filters: ProcessFilterCloudModel [] = [];

    constructor(
        private processFilterCloudService: ProcessFilterCloudService,
        private translationService: TranslationService ) { }

    ngOnChanges(changes: SimpleChanges) {
        const appName = changes['appName'];
        const filter = changes['filterParam'];
        if (appName && appName.currentValue) {
            this.getFilters(appName.currentValue);
        } else if (filter && filter.currentValue !== filter.previousValue) {
            this.selectFilter(filter.currentValue);
        }
    }

    /**
     * Fetch the filter list based on appName
     */
    getFilters(appName: string) {
        this.filters$ = this.processFilterCloudService.getProcessFilters(appName);

        this.filters$.subscribe(
            (res: ProcessFilterCloudModel[]) => {
                this.resetFilter();
                this.filters = Object.assign([], res);
                this.selectFilterAndEmit(this.filterParam);
                this.success.emit(res);
            },
            (err: any) => {
                this.error.emit(err);
            }
        );
    }

    /**
     * Pass the selected filter as next
     */
    public selectFilter(paramFilter: FilterParamsModel) {
        if (paramFilter) {
            this.currentFilter = this.filters.find((filter, index) => {
                return paramFilter.id === filter.id ||
                (paramFilter.name && this.checkFilterNamesEquality(paramFilter.name, filter.name)) ||
                (paramFilter.key && (paramFilter.key === filter.key)) ||
                paramFilter.index === index;
            });
        }
        if (!this.currentFilter) {
            this.selectDefaultProcessFilter();
        }
    }

    /**
     * Check equality of the filter names by translating the given name strings
     */
    private checkFilterNamesEquality(name1: string, name2: string ): boolean {
        const translatedName1 = this.translationService.instant(name1);
        const translatedName2 = this.translationService.instant(name2);

        return translatedName1.toLocaleLowerCase() === translatedName2.toLocaleLowerCase();
    }

    /**
     * Select and emit the given filter
     */
    public selectFilterAndEmit(newParamFilter: FilterParamsModel) {
        this.selectFilter(newParamFilter);
        this.filterClick.emit(this.currentFilter);
    }

    /**
     * Select filter with the id
     */
    public selectFilterById(id: string) {
        this.selectFilterAndEmit(<ProcessFilterCloudModel> {id: id});
    }

    /**
     * Select as default process filter the first in the list
     */
    public selectDefaultProcessFilter() {
        if (!this.isFilterListEmpty()) {
            this.currentFilter = this.filters[0];
        }
    }

    /**
     * Return the current process
     */
    getCurrentFilter(): ProcessFilterCloudModel {
        return this.currentFilter;
    }

    /**
     * Check if the filter list is empty
     */
    isFilterListEmpty(): boolean {
        return this.filters === undefined || (this.filters && this.filters.length === 0);
    }

    /**
     * Reset the filters
     */
    private resetFilter() {
        this.filters = [];
        this.currentFilter = undefined;
    }
}
