/************************************************************************************************
 * If you change the GridOptions interface, you must also update PropertyKeys to be consistent. *
 ************************************************************************************************/
import { RowNode } from "./rowNode";
import { GridApi } from "../gridApi";
import { ColumnApi } from "../columns/columnApi";
import { Column } from "./column";
import { IViewportDatasource } from "../interfaces/iViewportDatasource";
import { ICellRenderer, ICellRendererComp, ICellRendererFunc } from "../rendering/cellRenderers/iCellRenderer";
import { ColDef, ColGroupDef, IAggFunc, SuppressKeyboardEventParams } from "./colDef";
import { IDatasource } from "../interfaces/iDatasource";
import { CellPosition } from "./cellPosition";
import { IServerSideDatasource } from "../interfaces/iServerSideDatasource";
import { CsvExportParams, ProcessCellForExportParams, ProcessHeaderForExportParams } from "../interfaces/exportParams";
import {
    AsyncTransactionsFlushed,
    BodyScrollEvent,
    CellClickedEvent,
    CellContextMenuEvent,
    CellDoubleClickedEvent,
    CellEditingStartedEvent,
    CellEditingStoppedEvent,
    CellFocusedEvent,
    CellKeyDownEvent,
    CellKeyPressEvent,
    CellMouseDownEvent,
    CellMouseOutEvent,
    CellMouseOverEvent,
    CellValueChangedEvent,
    ChartCreated,
    ChartDestroyed,
    ChartOptionsChanged,
    ChartRangeSelectionChanged,
    ColumnAggFuncChangeRequestEvent,
    ColumnEverythingChangedEvent,
    ColumnGroupOpenedEvent,
    ColumnMovedEvent,
    ColumnPinnedEvent,
    ColumnPivotChangedEvent,
    ColumnPivotChangeRequestEvent,
    ColumnPivotModeChangedEvent,
    ColumnResizedEvent,
    ColumnRowGroupChangedEvent,
    ColumnRowGroupChangeRequestEvent,
    ColumnValueChangedEvent,
    ColumnValueChangeRequestEvent,
    ColumnVisibleEvent,
    ComponentStateChangedEvent,
    DisplayedColumnsChangedEvent,
    DragStartedEvent,
    DragStoppedEvent,
    ExpandCollapseAllEvent,
    FillEndEvent,
    FillStartEvent,
    FilterOpenedEvent,
    FilterChangedEvent,
    FilterModifiedEvent,
    FirstDataRenderedEvent,
    GridColumnsChangedEvent,
    GridReadyEvent,
    ModelUpdatedEvent,
    NewColumnsLoadedEvent,
    PaginationChangedEvent,
    PasteEndEvent,
    PasteStartEvent,
    PinnedRowDataChangedEvent,
    RangeSelectionChangedEvent,
    RowClickedEvent,
    RowDataChangedEvent,
    RowDataUpdatedEvent,
    RowDoubleClickedEvent,
    RowDragEvent,
    RowEditingStartedEvent,
    RowEditingStoppedEvent,
    RowGroupOpenedEvent,
    RowSelectedEvent,
    RowValueChangedEvent,
    SelectionChangedEvent,
    SortChangedEvent,
    ToolPanelVisibleChangedEvent,
    ViewportChangedEvent,
    VirtualColumnsChangedEvent,
    VirtualRowRemovedEvent,
    GridSizeChangedEvent,
    FullWidthCellKeyPressEvent,
    FullWidthCellKeyDownEvent
} from "../events";
import { IComponent } from "../interfaces/iComponent";
import { ILoadingOverlayComp } from "../rendering/overlays/loadingOverlayComponent";
import { INoRowsOverlayComp } from "../rendering/overlays/noRowsOverlayComponent";
import { StatusPanelDef } from "../interfaces/iStatusPanel";
import { SideBarDef } from "./sideBar";
import { ChartMenuOptions, ChartOptions, ChartType } from "../interfaces/iChartOptions";
import { AgChartOptions, AgChartTheme, AgChartThemeOverrides } from "../interfaces/iAgChartOptions";
import { ServerSideTransaction } from "../interfaces/serverSideTransaction";
import { HeaderPosition } from "../headerRendering/header/headerPosition";
import { ExcelExportParams, ExcelStyle } from "../interfaces/iExcelCreator";

export interface GridOptions {
    // ******************************************************************************************************
    // If you change the properties on this interface, you must also update PropertyKeys to be consistent. *
    // ******************************************************************************************************

    /** Set once in init, can never change*/
    suppressBrowserResizeObserver?: boolean;
    rowDragManaged?: boolean;
    suppressRowDrag?: boolean;
    suppressMoveWhenRowDragging?: boolean;
    enableMultiRowDragging?: boolean;
    ensureDomOrder?: boolean;
    suppressAggFilteredOnly?: boolean;
    showOpenedGroup?: boolean;
    /** @deprecated */
    deltaRowDataMode?: boolean;
    /** @deprecated */
    deltaColumnMode?: boolean;
    /** @deprecated */
    applyColumnDefOrder?: boolean; // is now the default, to turn off, set maintainColumnOrder
    maintainColumnOrder?: boolean;
    immutableData?: boolean;
    /** @deprecated */
    immutableColumns?: boolean;
    scrollbarWidth?: number;
    suppressRowClickSelection?: boolean;
    suppressRowHoverHighlight?: boolean;
    suppressCellSelection?: boolean;
    suppressClearOnFillReduction?: boolean;
    suppressMaintainUnsortedOrder?: boolean;
    sortingOrder?: (string | null)[];
    suppressMultiSort?: boolean;
    multiSortKey?: string;
    accentedSort?: boolean;
    deltaSort?: boolean;
    suppressHorizontalScroll?: boolean;
    alwaysShowHorizontalScroll?: boolean;
    alwaysShowVerticalScroll?: boolean;
    debounceVerticalScrollbar?: boolean;
    unSortIcon?: boolean;
    rowBuffer?: number;
    tooltipShowDelay?: number;
    tooltipMouseTrack?: boolean;
    enableRtl?: boolean;
    enableBrowserTooltips?: boolean;
    colResizeDefault?: string;
    enableCellExpressions?: boolean;
    enableCellTextSelection?: boolean;
    enableGroupEdit?: boolean;
    enterMovesDownAfterEdit?: boolean;
    enterMovesDown?: boolean;
    suppressMiddleClickScrolls?: boolean;
    preventDefaultOnContextMenu?: boolean;
    suppressPreventDefaultOnMouseWheel?: boolean;
    suppressScrollOnNewData?: boolean;
    suppressMenuHide?: boolean;
    singleClickEdit?: boolean;
    suppressClickEdit?: boolean;
    tabIndex?: number;

    /** Allows user to suppress certain keyboard events */
    suppressKeyboardEvent?: (params: SuppressKeyboardEventParams) => boolean;

    /** @deprecated Use stopEditingWhenCellsLoseFocus instead */
    stopEditingWhenGridLosesFocus?: boolean;
    stopEditingWhenCellsLoseFocus?: boolean;

    debug?: boolean;
    icons?: { [key: string]: Function | string; };
    angularCompileRows?: boolean;
    angularCompileFilters?: boolean;

    suppressLoadingOverlay?: boolean;
    suppressNoRowsOverlay?: boolean;
    suppressAutoSize?: boolean;
    autoSizePadding?: number;
    skipHeaderOnAutoSize?: boolean;
    animateRows?: boolean;
    suppressColumnMoveAnimation?: boolean;
    suppressMovableColumns?: boolean;
    suppressDragLeaveHidesColumns?: boolean;
    suppressMakeColumnVisibleAfterUnGroup?: boolean;
    suppressParentsInRowNodes?: boolean;
    suppressFieldDotNotation?: boolean;
    suppressCopyRowsToClipboard?: boolean;
    copyHeadersToClipboard?: boolean;
    clipboardDeliminator?: string;
    suppressClipboardPaste?: boolean;
    suppressClipboardApi?: boolean;
    suppressLastEmptyLineOnPaste?: boolean;
    suppressAggFuncInHeader?: boolean;
    suppressAggAtRootLevel?: boolean;
    suppressFocusAfterRefresh?: boolean;
    rowModelType?: string;
    pivotMode?: boolean;
    pivotColumnGroupTotals?: string;
    pivotRowTotals?: string;
    suppressExpandablePivotGroups?: boolean;

    suppressEnterpriseResetOnNewColumns?: boolean;
    // enterprise only
    enableRangeSelection?: boolean;
    enableRangeHandle?: boolean;
    enableFillHandle?: boolean;
    fillHandleDirection?: string;
    suppressMultiRangeSelection?: boolean;
    rowGroupPanelShow?: string;
    pivotPanelShow?: string;
    suppressContextMenu?: boolean;
    allowContextMenuWithControlKey?: boolean;

    /** @deprecated - no longer needed, transaction updates keep group state */
    rememberGroupStateWhenNewData?: boolean;
    suppressModelUpdateAfterUpdateTransaction?: boolean;
    viewportRowModelPageSize?: number;
    viewportRowModelBufferSize?: number;
    enableCellChangeFlash?: boolean;
    cellFlashDelay?: number;
    cellFadeDelay?: number;
    allowShowChangeAfterFilter?: boolean;
    quickFilterText?: string;
    cacheQuickFilter?: boolean;
    aggFuncs?: { [key: string]: IAggFunc; };
    suppressColumnVirtualisation?: boolean;
    functionsReadOnly?: boolean;
    functionsPassive?: boolean;
    maxConcurrentDatasourceRequests?: number;
    maxBlocksInCache?: number;
    purgeClosedRowNodes?: boolean;
    domLayout?: string;
    suppressChangeDetection?: boolean;
    aggregateOnlyChangedColumns?: boolean;
    valueCache?: boolean;
    valueCacheNeverExpires?: boolean;
    batchUpdateWaitMillis?: number;
    asyncTransactionWaitMillis?: number;
    suppressRowTransform?: boolean;
    /** @deprecated */
    suppressSetColumnStateEvents?: boolean;
    /** @deprecated */
    suppressColumnStateEvents?: boolean;
    allowDragFromColumnsToolPanel?: boolean;
    suppressMaxRenderedRowRestriction?: boolean;
    excludeChildrenWhenTreeDataFiltering?: boolean;
    undoRedoCellEditing?: boolean;
    undoRedoCellEditingLimit?: number;

    cacheOverflowSize?: number;
    infiniteInitialRowCount?: number;
    paginationPageSize?: number;
    cacheBlockSize?: number;
    blockLoadDebounceMillis?: number;
    paginationAutoPageSize?: boolean;
    suppressPaginationPanel?: boolean;

    pagination?: boolean;
    paginateChildRows?: boolean;
    editType?: string;
    suppressTouch?: boolean;
    suppressAsyncEvents?: boolean;

    embedFullWidthRows?: boolean;
    /** @deprecated */
    deprecatedEmbedFullWidthRows?: boolean;

    excelStyles?: ExcelStyle[];
    /** @deprecated Use floatingFilter on the colDef instead */
    floatingFilter?: boolean;
    suppressExcelExport?: boolean;
    suppressCsvExport?: boolean;

    // these should really be deprecated, as the user should be using the default
    // column definitions for specifying column defaults.
    colWidth?: number;
    minColWidth?: number;
    maxColWidth?: number;

    suppressPropertyNamesCheck?: boolean;
    serverSideSortingAlwaysResets?: boolean;
    serverSideFilteringAlwaysResets?: boolean;
    serverSideStoreType?: ServerSideStoreType;

    getServerSideStoreParams?: (params: GetServerSideStoreParamsParams) => ServerSideStoreParams;
    isServerSideGroupOpenByDefault?: (params: IsServerSideGroupOpenByDefaultParams) => boolean;
    isGroupOpenByDefault?: (params: IsGroupOpenByDefaultParams) => boolean;

    statusBar?: { statusPanels: StatusPanelDef[]; };

    // just set once
    localeText?: { [key: string]: string };
    localeTextFunc?: (key: string, defaultValue: string) => string;
    suppressAnimationFrame?: boolean;
    defaultColGroupDef?: Partial<ColGroupDef>;
    defaultColDef?: ColDef;

    /** @deprecated Use defaultCsvExportParams or defaultExcelExportParams */
    defaultExportParams?: CsvExportParams | ExcelExportParams;
    defaultCsvExportParams?: CsvExportParams;
    defaultExcelExportParams?: ExcelExportParams;

    pivotSuppressAutoColumn?: boolean;

    autoGroupColumnDef?: ColDef;

    groupSelectsChildren?: boolean;
    groupSelectsFiltered?: boolean;
    groupIncludeFooter?: boolean;
    groupIncludeTotalFooter?: boolean;
    groupRemoveSingleChildren?: boolean;
    groupRemoveLowestSingleChildren?: boolean;
    groupHideOpenParents?: boolean;
    groupSuppressBlankHeader?: boolean;
    groupMaintainOrder?: boolean;

    groupDisplayType?: RowGroupingDisplayType;

    /** @deprecated - Use groupDisplayType = 'multipleColumns' instead */
    groupMultiAutoColumn?: boolean;
    /** @deprecated - Use groupDisplayType = 'groupRows' instead */
    groupUseEntireRow?: boolean;
    /** @deprecated - Use groupDisplayType = 'custom' instead */
    groupSuppressAutoColumn?: boolean;

    enableOldSetFilterModel?: boolean;
    enableCharts?: boolean;

    // changeable, but no immediate impact
    context?: any;
    rowStyle?: { [cssProperty: string]: string };
    rowClass?: string | string[];
    groupDefaultExpanded?: number;
    alignedGrids?: GridOptions[];

    rowSelection?: string;
    suppressRowDeselection?: boolean;

    /** @deprecated - rowDeselection is now true by default and should be suppressed by using suppressRowDeselection */
    rowDeselection?: boolean;

    rowMultiSelectWithClick?: boolean;
    isRowSelectable?: IsRowSelectable;
    overlayLoadingTemplate?: string;
    overlayNoRowsTemplate?: string;
    rowHeight?: number;
    detailRowHeight?: number;
    popupParent?: HTMLElement;

    masterDetail?: boolean;
    keepDetailRows?: boolean;
    keepDetailRowsCount?: number;
    isRowMaster?: IsRowMaster;
    detailCellRenderer?: { new(): ICellRendererComp; } | ICellRendererFunc | string;
    detailCellRendererFramework?: any;
    detailCellRendererParams?: any;
    detailRowAutoHeight?: boolean;

    // changeable with impact
    rowData?: any[];
    pinnedTopRowData?: any[];
    pinnedBottomRowData?: any[];
    sideBar?: SideBarDef | string | boolean | null;
    columnDefs?: (ColDef | ColGroupDef)[];
    columnTypes?: { [key: string]: ColDef; };
    datasource?: IDatasource;
    viewportDatasource?: IViewportDatasource;
    serverSideDatasource?: IServerSideDatasource;

    // in properties
    headerHeight?: number;
    pivotHeaderHeight?: number;
    groupHeaderHeight?: number;
    pivotGroupHeaderHeight?: number;
    floatingFiltersHeight?: number;

    // *****************************************************************************************************
    // If you change the callbacks on this interface, you must also update PropertyKeys to be consistent. *
    // *****************************************************************************************************

    paginationNumberFormatter?: (params: PaginationNumberFormatterParams) => string;
    postProcessPopup?: (params: PostProcessPopupParams) => void;
    frameworkComponents?: { [p: string]: { new(): any; }; } | any;
    components?: { [p: string]: any; };
    groupRowRenderer?: { new(): ICellRendererComp; } | ICellRendererFunc | string;
    groupRowRendererFramework?: any;
    groupRowRendererParams?: any;
    /** @deprecated - this is now groupRowRendererParams.innerRenderer */
    groupRowInnerRenderer?: { new(): ICellRendererComp; } | ICellRendererFunc | string;
    /** @deprecated - this is now groupRowRendererParams.innerRendererFramework */
    groupRowInnerRendererFramework?: any;
    createChartContainer?: (params: ChartRef) => void;
    fillOperation?: (params: FillOperationParams) => any;

    isExternalFilterPresent?(): boolean;
    doesExternalFilterPass?(node: RowNode): boolean;

    getRowStyle?: (params: RowClassParams) => { [cssProperty: string]: string };
    getRowClass?: (params: RowClassParams) => string | string[] | undefined;
    rowClassRules?: RowClassRules;
    getRowHeight?: (params: RowHeightParams) => number | undefined | null;
    sendToClipboard?: (params: SendToClipboardParams) => void;
    processDataFromClipboard?: (params: ProcessDataFromClipboardParams) => string[][] | null;

    navigateToNextHeader?: (params: NavigateToNextHeaderParams) => HeaderPosition;
    tabToNextHeader?: (params: TabToNextHeaderParams) => HeaderPosition;

    navigateToNextCell?: (params: NavigateToNextCellParams) => CellPosition;
    tabToNextCell?: (params: TabToNextCellParams) => CellPosition;

    getDocument?: () => Document;

    /** @deprecated - Use defaultGroupOrderComparator instead */
    defaultGroupSortComparator?: (nodeA: RowNode, nodeB: RowNode) => number;
    defaultGroupOrderComparator?: (nodeA: RowNode, nodeB: RowNode) => number;

    loadingCellRenderer?: { new(): ICellRenderer; } | string;
    loadingCellRendererFramework?: any;
    loadingCellRendererParams?: any;

    loadingOverlayComponent?: { new(): ILoadingOverlayComp; } | string;
    loadingOverlayComponentFramework?: any;
    loadingOverlayComponentParams?: any;

    noRowsOverlayComponent?: { new(): INoRowsOverlayComp; } | string;
    noRowsOverlayComponentFramework?: any;
    noRowsOverlayComponentParams?: any;

    fullWidthCellRenderer?: { new(): ICellRendererComp; } | ICellRendererFunc | string;
    fullWidthCellRendererFramework?: any;
    fullWidthCellRendererParams?: any;

    isFullWidthCell?(rowNode: RowNode): boolean;

    groupRowAggNodes?(nodes: RowNode[]): any;

    getBusinessKeyForNode?(node: RowNode): string;

    getDataPath?: GetDataPath;
    treeData?: boolean;
    treeDataDisplayType?: TreeDataDisplayType;

    isServerSideGroup?: IsServerSideGroup;
    isApplyServerSideTransaction?: IsApplyServerSideTransaction;
    getServerSideGroupKey?: GetServerSideGroupKey;
    getContextMenuItems?: GetContextMenuItems;
    getMainMenuItems?: GetMainMenuItems;
    getChartToolbarItems?: GetChartToolbarItems;
    getRowNodeId?: GetRowNodeIdFunc;

    getChildCount?(dataItem: any): number;

    processRowPostCreate?(params: ProcessRowParams): void;

    processCellForClipboard?(params: ProcessCellForExportParams): any;

    processHeaderForClipboard?(params: ProcessHeaderForExportParams): any;

    processCellFromClipboard?(params: ProcessCellForExportParams): any;

    processSecondaryColDef?(colDef: ColDef): void;

    processSecondaryColGroupDef?(colGroupDef: ColGroupDef): void;

    postSort?(nodes: RowNode[]): void;

    chartThemes?: string[];

    customChartThemes?: { [name: string]: AgChartTheme };

    chartThemeOverrides?: AgChartThemeOverrides;

    /** @deprecated */
    processChartOptions?(params: ProcessChartOptionsParams): ChartOptions<any>;

    // **********************************************************************************************************
    // * If you change the events on this interface, you do *not* need to update PropertyKeys to be consistent, *
    // * as event callbacks are automatically generated.                                                        *
    // **********************************************************************************************************

    onColumnEverythingChanged?(event: ColumnEverythingChangedEvent): void;

    onToolPanelVisibleChanged?(event: ToolPanelVisibleChangedEvent): void;

    onNewColumnsLoaded?(event: NewColumnsLoadedEvent): void;

    onColumnPivotModeChanged?(event: ColumnPivotModeChangedEvent): void;

    onColumnRowGroupChanged?(event: ColumnRowGroupChangedEvent): void;

    onColumnPivotChanged?(event: ColumnPivotChangedEvent): void;

    onGridColumnsChanged?(event: GridColumnsChangedEvent): void;

    onColumnValueChanged?(event: ColumnValueChangedEvent): void;

    onColumnMoved?(event: ColumnMovedEvent): void;

    onColumnVisible?(event: ColumnVisibleEvent): void;

    onColumnPinned?(event: ColumnPinnedEvent): void;

    onColumnGroupOpened?(event: ColumnGroupOpenedEvent): void;

    onColumnResized?(event: ColumnResizedEvent): void;

    onDisplayedColumnsChanged?(event: DisplayedColumnsChangedEvent): void;

    onVirtualColumnsChanged?(event: VirtualColumnsChangedEvent): void;

    onRowGroupOpened?(event: RowGroupOpenedEvent): void;

    onRowDataChanged?(event: RowDataChangedEvent): void;

    onRowDataUpdated?(event: RowDataUpdatedEvent): void;

    onPinnedRowDataChanged?(event: PinnedRowDataChangedEvent): void;

    onRangeSelectionChanged?(event: RangeSelectionChangedEvent): void;

    onColumnRowGroupChangeRequest?(event: ColumnRowGroupChangeRequestEvent): void;

    onColumnPivotChangeRequest?(event: ColumnPivotChangeRequestEvent): void;

    onColumnValueChangeRequest?(event: ColumnValueChangeRequestEvent): void;

    onColumnAggFuncChangeRequest?(event: ColumnAggFuncChangeRequestEvent): void;

    onModelUpdated?(event: ModelUpdatedEvent): void;

    onCellKeyDown?(event: CellKeyDownEvent | FullWidthCellKeyDownEvent): void;

    onCellKeyPress?(event: CellKeyPressEvent | FullWidthCellKeyPressEvent): void;

    onCellClicked?(event: CellClickedEvent): void;

    onCellMouseDown?(event: CellMouseDownEvent): void;

    onCellDoubleClicked?(event: CellDoubleClickedEvent): void;

    onCellContextMenu?(event: CellContextMenuEvent): void;

    onCellValueChanged?(event: CellValueChangedEvent): void;

    onCellMouseOver?(event: CellMouseOverEvent): void;

    onCellMouseOut?(event: CellMouseOutEvent): void;

    onRowValueChanged?(event: RowValueChangedEvent): void;

    onRowEditingStarted?(event: RowEditingStartedEvent): void;

    onRowEditingStopped?(event: RowEditingStoppedEvent): void;

    onCellEditingStarted?(event: CellEditingStartedEvent): void;

    onCellEditingStopped?(event: CellEditingStoppedEvent): void;

    onCellFocused?(event: CellFocusedEvent): void;

    onRowSelected?(event: RowSelectedEvent): void;

    onSelectionChanged?(event: SelectionChangedEvent): void;

    onFilterOpened?(event: FilterOpenedEvent): void;

    onFilterChanged?(event: FilterChangedEvent): void;

    onFilterModified?(event: FilterModifiedEvent): void;

    onSortChanged?(event: SortChangedEvent): void;

    onVirtualRowRemoved?(event: VirtualRowRemovedEvent): void;

    onRowClicked?(event: RowClickedEvent): void;

    onRowDoubleClicked?(event: RowDoubleClickedEvent): void;

    onGridReady?(event: GridReadyEvent): void;

    onViewportChanged?(event: ViewportChangedEvent): void;

    onDragStarted?(event: DragStartedEvent): void;

    onDragStopped?(event: DragStoppedEvent): void;

    onPaginationChanged?(event: PaginationChangedEvent): void;

    onRowDragEnter?(event: RowDragEvent): void;

    onRowDragMove?(event: RowDragEvent): void;

    onRowDragLeave?(event: RowDragEvent): void;

    onRowDragEnd?(event: RowDragEvent): void;

    onPasteStart?(event: PasteStartEvent): void;

    onPasteEnd?(event: PasteEndEvent): void;

    onFillStart?(event: FillStartEvent): void;

    onFillEnd?(event: FillEndEvent): void;

    onBodyScroll?(event: BodyScrollEvent): void;

    onFirstDataRendered?(event: FirstDataRenderedEvent): void;

    onExpandOrCollapseAll?(event: ExpandCollapseAllEvent): void;

    onChartCreated?(event: ChartCreated): void;

    onChartRangeSelectionChanged?(event: ChartRangeSelectionChanged): void;

    onChartOptionsChanged?(event: ChartOptionsChanged): void;

    onChartDestroyed?(event: ChartDestroyed): void;

    onComponentStateChanged?(event: ComponentStateChangedEvent): void;

    onAsyncTransactionsFlushed?(event: AsyncTransactionsFlushed): void;

    onGridSizeChanged?(event: GridSizeChangedEvent): void;

    // apis, set by the grid on init, set to null on destroy
    api?: GridApi | null;
    columnApi?: ColumnApi | null;
}

export enum RowGroupingDisplayType {
    SINGLE_COLUMN = 'singleColumn',
    MULTIPLE_COLUMNS = 'multipleColumns',
    GROUP_ROWS = 'groupRows',
    CUSTOM = 'custom',
}

export enum TreeDataDisplayType {
    AUTO = 'auto',
    CUSTOM = 'custom',
}

export interface FillOperationParams {
    event: MouseEvent;
    values: any[];
    initialValues: any[];
    currentIndex: number;
    currentCellValue: any;
    api: GridApi;
    columnApi: ColumnApi;
    context: any;
    direction: string; // up, down, left or right
    column?: Column; // only present if up / down
    rowNode?: RowNode; // only present if left / right,
}

export interface GetDataPath {
    (data: any): string[];
}

export interface IsServerSideGroup {
    (dataItem: any): boolean;
}

export interface IsApplyServerSideTransaction {
    (params: IsApplyServerSideTransactionParams): boolean;
}

export interface IsApplyServerSideTransactionParams {
    transaction: ServerSideTransaction;
    parentNode: RowNode;
    storeInfo: any;
}

export interface GetServerSideGroupKey {
    (dataItem: any): string;
}

export interface IsRowMaster {
    (dataItem: any): boolean;
}

export interface IsRowSelectable {
    (node: RowNode): boolean;
}

export interface RowClassRules {
    [cssClassName: string]: (((params: RowClassParams) => boolean) | string);
}

export interface RowClassParams {
    data: any;
    node: RowNode;
    rowIndex: number;
    $scope: any;
    api: GridApi;
    columnApi: ColumnApi;
    context: any;
}

export interface RowHeightParams {
    data: any;
    node: RowNode;
    api: GridApi;
    context: any;
}

export interface SendToClipboardParams {
    data: string;
}

export interface ProcessChartOptionsParams {
    type: ChartType;
    options: ChartOptions<any>;
}

export interface ProcessChartParams {
    type: ChartType;
    options: AgChartOptions;
    chart: any;
}

export interface GetContextMenuItemsParams {
    defaultItems: string[] | undefined;
    column: Column;
    node: RowNode;
    value: any;
    api: GridApi;
    columnApi: ColumnApi;
    context: any;
}

export interface GetContextMenuItems {
    (params: GetContextMenuItemsParams): (string | MenuItemDef)[];
}

export interface GetChartToolbarItemsParams {
    defaultItems?: ChartMenuOptions[];
    api: GridApi;
    columnApi: ColumnApi;
}

export interface GetChartToolbarItems {
    (params: GetChartToolbarItemsParams): ChartMenuOptions[];
}

export interface MenuItemDef {
    name: string;
    disabled?: boolean;
    shortcut?: string;
    action?: () => void;
    checked?: boolean;
    icon?: HTMLElement | string;
    subMenu?: (MenuItemDef | string)[] | IComponent<any>;
    cssClasses?: string[];
    tooltip?: string;
}

export interface GetMainMenuItemsParams {
    column: Column;
    api: GridApi;
    columnApi: ColumnApi;
    context: any;
    defaultItems: string[];
}

export interface GetMainMenuItems {
    (params: GetMainMenuItemsParams): (string | MenuItemDef)[];
}

export interface GetRowNodeIdFunc {
    (data: any): string;
}

export interface ProcessRowParams {
    eRow: HTMLElement;
    ePinnedLeftRow: HTMLElement;
    ePinnedRightRow: HTMLElement;
    rowIndex: number;
    node: RowNode;
    api: GridApi;
    columnApi: ColumnApi;
    addRenderedRowListener: (eventType: string, listener: Function) => void;
    context: any;
}

export interface NavigateToNextHeaderParams {
    key: string;
    previousHeaderPosition: HeaderPosition | null;
    nextHeaderPosition: HeaderPosition | null;
    event: KeyboardEvent;
    headerRowCount: number;
}

export interface TabToNextHeaderParams {
    backwards: boolean;
    previousHeaderPosition: HeaderPosition | null;
    nextHeaderPosition: HeaderPosition | null;
    headerRowCount: number;
}

export interface NavigateToNextCellParams {
    key: number;
    previousCellPosition: CellPosition;
    nextCellPosition: CellPosition | null;
    event: KeyboardEvent | null;
}

export interface TabToNextCellParams {
    backwards: boolean;
    editing: boolean;
    previousCellPosition: CellPosition;
    nextCellPosition: CellPosition;
}

export interface PostProcessPopupParams {
    // if popup is for a column, this gives the Column
    column?: Column | null;
    // if popup is for a row, this gives the RowNode
    rowNode?: RowNode;
    // the popup we are showing
    ePopup: HTMLElement;
    // The different types are: 'contextMenu', 'columnMenu', 'aggFuncSelect', 'popupCellEditor'
    type: string;
    // if the popup is as a result of a button click (eg menu button), this is the component that the user clicked
    eventSource?: HTMLElement | null;
    // if the popup is as a result of a click or touch, this is the event - eg user showing context menu
    mouseEvent?: MouseEvent | Touch | null;
}

export interface PaginationNumberFormatterParams {
    value: number;
}

export interface ProcessDataFromClipboardParams {
    data: string[][];
}

export interface ChartRef {
    chartId: string;
    chart: any;
    chartElement: HTMLElement;
    destroyChart: () => void;
}

export enum ServerSideStoreType {
    Full = 'full',
    Partial = 'partial'
}

export interface ServerSideStoreParams {
    storeType?: ServerSideStoreType;
    maxBlocksInCache?: number;
    cacheBlockSize?: number;
}

export interface GetServerSideStoreParamsParams {
    level: number;
    parentRowNode?: RowNode;
    rowGroupColumns: Column[];
    pivotColumns: Column[];
    pivotMode: boolean;
}

export interface IsServerSideGroupOpenByDefaultParams {
    data: any;
    rowNode: RowNode;
}

export interface IsGroupOpenByDefaultParams {
    rowNode: RowNode;
    rowGroupColumn: Column;
    level: number;
    field: string;
    key: string;
}
