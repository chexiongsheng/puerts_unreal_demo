declare module "react-umg" {
    import * as React from 'react';
    import * as UE from 'ue';
    import * as cpp from 'cpp';
    type TArray<T> = UE.TArray<T>;
    type TSet<T> = UE.TSet<T>;
    type TMap<TKey, TValue> = UE.TMap<TKey, TValue>;

    type RecursivePartial<T> = {
        [P in keyof T]?:
        T[P] extends (infer U)[] ? RecursivePartial<U>[] :
        T[P] extends object ? RecursivePartial<T[P]> :
        T[P];
    };

    interface PanelSlot {
    }

    interface BackgroundBlurSlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface BorderSlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface ButtonSlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface CanvasPanelSlot extends PanelSlot {
        LayoutData?: RecursivePartial<UE.AnchorData>;
        bAutoSize?: boolean;
        ZOrder?: number;
    }

    interface GridSlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
        Row?: number;
        RowSpan?: number;
        Column?: number;
        ColumnSpan?: number;
        Layer?: number;
        Nudge?: RecursivePartial<UE.Vector2D>;
    }

    interface HorizontalBoxSlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        Size?: RecursivePartial<UE.SlateChildSize>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface OverlaySlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface SafeZoneSlot extends PanelSlot {
        bIsTitleSafe?: boolean;
        SafeAreaScale?: RecursivePartial<UE.Margin>;
        HAlign?: UE.EHorizontalAlignment;
        VAlign?: UE.EVerticalAlignment;
        Padding?: RecursivePartial<UE.Margin>;
    }

    interface ScaleBoxSlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface ScrollBoxSlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface SizeBoxSlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface UniformGridSlot extends PanelSlot {
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
        Row?: number;
        Column?: number;
    }

    interface VerticalBoxSlot extends PanelSlot {
        Size?: RecursivePartial<UE.SlateChildSize>;
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface WidgetSwitcherSlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface WindowTitleBarAreaSlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface WrapBoxSlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        bFillEmptySpace?: boolean;
        FillSpanWhenLessThan?: number;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    export interface Props {
        Slot ? : PanelSlot;
    }

    interface WidgetProps extends Props {
        bIsEnabledDelegate?: () => boolean;
        ToolTipText?: string;
        ToolTipTextDelegate?: () => string;
        VisibilityDelegate?: () => UE.ESlateVisibility;
        RenderTransform?: RecursivePartial<UE.WidgetTransform>;
        RenderTransformPivot?: RecursivePartial<UE.Vector2D>;
        bIsVariable?: boolean;
        bCreatedByConstructionScript?: boolean;
        bIsEnabled?: boolean;
        bOverride_Cursor?: boolean;
        bOverrideAccessibleDefaults?: boolean;
        bCanChildrenBeAccessible?: boolean;
        AccessibleBehavior?: UE.ESlateAccessibleBehavior;
        AccessibleSummaryBehavior?: UE.ESlateAccessibleBehavior;
        AccessibleText?: string;
        AccessibleTextDelegate?: () => string;
        AccessibleSummaryText?: string;
        AccessibleSummaryTextDelegate?: () => string;
        bIsVolatile?: boolean;
        bHiddenInDesigner?: boolean;
        bExpandedInDesigner?: boolean;
        bLockedInDesigner?: boolean;
        Cursor?: UE.EMouseCursor;
        Clipping?: UE.EWidgetClipping;
        Visibility?: UE.ESlateVisibility;
        RenderOpacity?: number;
        FlowDirectionPreference?: UE.EFlowDirectionPreference;
        DesignerFlags?: number;
        DisplayLabel?: string;
        CategoryName?: string;
    }

    class Widget extends React.Component<WidgetProps> {
        nativePtr: UE.Widget;
    }

    interface UserWidgetProps extends WidgetProps {
        ColorAndOpacity?: RecursivePartial<UE.LinearColor>;
        ColorAndOpacityDelegate?: () => UE.LinearColor;
        ForegroundColor?: RecursivePartial<UE.SlateColor>;
        ForegroundColorDelegate?: () => UE.SlateColor;
        Padding?: RecursivePartial<UE.Margin>;
        NamedSlotBindings?: TArray<UE.NamedSlotBinding>;
        DesignTimeSize?: RecursivePartial<UE.Vector2D>;
        DesignSizeMode?: UE.EDesignPreviewSizeMode;
        PaletteCategory?: string;
        Priority?: number;
        bSupportsKeyboardFocus?: boolean;
        bIsFocusable?: boolean;
        bStopAction?: boolean;
        bHasScriptImplementedTick?: boolean;
        bHasScriptImplementedPaint?: boolean;
        bCookedWidgetTree?: boolean;
        TickFrequency?: UE.EWidgetTickFrequency;
        AnimationCallbacks?: TArray<UE.AnimationEventBinding>;
    }

    class UserWidget extends React.Component<UserWidgetProps> {
        nativePtr: UE.UserWidget;
    }

    interface VREditorBaseUserWidgetProps extends UserWidgetProps {
    }

    class VREditorBaseUserWidget extends React.Component<VREditorBaseUserWidgetProps> {
        nativePtr: UE.VREditorBaseUserWidget;
    }

    interface PanelWidgetProps extends WidgetProps {
    }

    class PanelWidget extends React.Component<PanelWidgetProps> {
        nativePtr: UE.PanelWidget;
    }

    interface ContentWidgetProps extends PanelWidgetProps {
    }

    class ContentWidget extends React.Component<ContentWidgetProps> {
        nativePtr: UE.ContentWidget;
    }

    interface BackgroundBlurProps extends ContentWidgetProps {
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
        bApplyAlphaToBlur?: boolean;
        BlurStrength?: number;
        bOverrideAutoRadiusCalculation?: boolean;
        BlurRadius?: number;
        LowQualityFallbackBrush?: RecursivePartial<UE.SlateBrush>;
    }

    class BackgroundBlur extends React.Component<BackgroundBlurProps> {
        nativePtr: UE.BackgroundBlur;
    }

    interface BorderProps extends ContentWidgetProps {
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
        bShowEffectWhenDisabled?: boolean;
        ContentColorAndOpacity?: RecursivePartial<UE.LinearColor>;
        ContentColorAndOpacityDelegate?: () => UE.LinearColor;
        Padding?: RecursivePartial<UE.Margin>;
        Background?: RecursivePartial<UE.SlateBrush>;
        BackgroundDelegate?: () => UE.SlateBrush;
        BrushColor?: RecursivePartial<UE.LinearColor>;
        BrushColorDelegate?: () => UE.LinearColor;
        DesiredSizeScale?: RecursivePartial<UE.Vector2D>;
        bFlipForRightToLeftFlowDirection?: boolean;
        OnMouseButtonDownEvent?: (MyGeometry: UE.Geometry, MouseEvent: UE.PointerEvent) => UE.EventReply;
        OnMouseButtonUpEvent?: (MyGeometry: UE.Geometry, MouseEvent: UE.PointerEvent) => UE.EventReply;
        OnMouseMoveEvent?: (MyGeometry: UE.Geometry, MouseEvent: UE.PointerEvent) => UE.EventReply;
        OnMouseDoubleClickEvent?: (MyGeometry: UE.Geometry, MouseEvent: UE.PointerEvent) => UE.EventReply;
    }

    class Border extends React.Component<BorderProps> {
        nativePtr: UE.Border;
    }

    interface ButtonProps extends ContentWidgetProps {
        WidgetStyle?: RecursivePartial<UE.ButtonStyle>;
        ColorAndOpacity?: RecursivePartial<UE.LinearColor>;
        BackgroundColor?: RecursivePartial<UE.LinearColor>;
        ClickMethod?: UE.EButtonClickMethod;
        TouchMethod?: UE.EButtonTouchMethod;
        PressMethod?: UE.EButtonPressMethod;
        IsFocusable?: boolean;
        OnClicked?: () => void;
        OnPressed?: () => void;
        OnReleased?: () => void;
        OnHovered?: () => void;
        OnUnhovered?: () => void;
    }

    class Button extends React.Component<ButtonProps> {
        nativePtr: UE.Button;
    }

    interface CanvasPanelProps extends PanelWidgetProps {
    }

    class CanvasPanel extends React.Component<CanvasPanelProps> {
        nativePtr: UE.CanvasPanel;
    }

    interface CheckBoxProps extends ContentWidgetProps {
        CheckedState?: UE.ECheckBoxState;
        CheckedStateDelegate?: () => UE.ECheckBoxState;
        WidgetStyle?: RecursivePartial<UE.CheckBoxStyle>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        Padding?: RecursivePartial<UE.Margin>;
        BorderBackgroundColor?: RecursivePartial<UE.SlateColor>;
        IsFocusable?: boolean;
        OnCheckStateChanged?: (bIsChecked: boolean) => void;
    }

    class CheckBox extends React.Component<CheckBoxProps> {
        nativePtr: UE.CheckBox;
    }

    interface CircularThrobberProps extends WidgetProps {
        NumberOfPieces?: number;
        Period?: number;
        Radius?: number;
        Image?: RecursivePartial<UE.SlateBrush>;
        bEnableRadius?: boolean;
    }

    class CircularThrobber extends React.Component<CircularThrobberProps> {
        nativePtr: UE.CircularThrobber;
    }

    interface ComboBoxProps extends WidgetProps {
        bIsFocusable?: boolean;
    }

    class ComboBox extends React.Component<ComboBoxProps> {
        nativePtr: UE.ComboBox;
    }

    interface ComboBoxStringProps extends WidgetProps {
        DefaultOptions?: TArray<string>;
        SelectedOption?: string;
        WidgetStyle?: RecursivePartial<UE.ComboBoxStyle>;
        ItemStyle?: RecursivePartial<UE.TableRowStyle>;
        ContentPadding?: RecursivePartial<UE.Margin>;
        MaxListHeight?: number;
        HasDownArrow?: boolean;
        EnableGamepadNavigationMode?: boolean;
        Font?: RecursivePartial<UE.SlateFontInfo>;
        ForegroundColor?: RecursivePartial<UE.SlateColor>;
        bIsFocusable?: boolean;
        OnSelectionChanged?: (SelectedItem: string, SelectionType: UE.ESelectInfo) => void;
        OnOpening?: () => void;
    }

    class ComboBoxString extends React.Component<ComboBoxStringProps> {
        nativePtr: UE.ComboBoxString;
    }

    interface DynamicEntryBoxBaseProps extends WidgetProps {
        EntryBoxType?: UE.EDynamicBoxType;
        EntrySpacing?: RecursivePartial<UE.Vector2D>;
        SpacingPattern?: TArray<UE.Vector2D>;
        EntrySizeRule?: RecursivePartial<UE.SlateChildSize>;
        EntryHorizontalAlignment?: UE.EHorizontalAlignment;
        EntryVerticalAlignment?: UE.EVerticalAlignment;
        MaxElementSize?: number;
        EntryWidgetPool?: RecursivePartial<UE.UserWidgetPool>;
    }

    class DynamicEntryBoxBase extends React.Component<DynamicEntryBoxBaseProps> {
        nativePtr: UE.DynamicEntryBoxBase;
    }

    interface DynamicEntryBoxProps extends DynamicEntryBoxBaseProps {
        NumDesignerPreviewEntries?: number;
    }

    class DynamicEntryBox extends React.Component<DynamicEntryBoxProps> {
        nativePtr: UE.DynamicEntryBox;
    }

    interface EditableTextProps extends WidgetProps {
        Text?: string;
        TextDelegate?: () => string;
        HintText?: string;
        HintTextDelegate?: () => string;
        WidgetStyle?: RecursivePartial<UE.EditableTextStyle>;
        Font?: RecursivePartial<UE.SlateFontInfo>;
        ColorAndOpacity?: RecursivePartial<UE.SlateColor>;
        IsReadOnly?: boolean;
        IsPassword?: boolean;
        MinimumDesiredWidth?: number;
        IsCaretMovedWhenGainFocus?: boolean;
        SelectAllTextWhenFocused?: boolean;
        RevertTextOnEscape?: boolean;
        ClearKeyboardFocusOnCommit?: boolean;
        SelectAllTextOnCommit?: boolean;
        AllowContextMenu?: boolean;
        KeyboardType?: UE.EVirtualKeyboardType;
        VirtualKeyboardOptions?: RecursivePartial<UE.VirtualKeyboardOptions>;
        VirtualKeyboardDismissAction?: UE.EVirtualKeyboardDismissAction;
        Justification?: UE.ETextJustify;
        ShapedTextOptions?: RecursivePartial<UE.ShapedTextOptions>;
        OnTextChanged?: (Text: string) => void;
        OnTextCommitted?: (Text: string, CommitMethod: UE.ETextCommit) => void;
    }

    class EditableText extends React.Component<EditableTextProps> {
        nativePtr: UE.EditableText;
    }

    interface EditableTextBoxProps extends WidgetProps {
        Text?: string;
        TextDelegate?: () => string;
        WidgetStyle?: RecursivePartial<UE.EditableTextBoxStyle>;
        HintText?: string;
        HintTextDelegate?: () => string;
        Font?: RecursivePartial<UE.SlateFontInfo>;
        ForegroundColor?: RecursivePartial<UE.LinearColor>;
        BackgroundColor?: RecursivePartial<UE.LinearColor>;
        ReadOnlyForegroundColor?: RecursivePartial<UE.LinearColor>;
        IsReadOnly?: boolean;
        IsPassword?: boolean;
        MinimumDesiredWidth?: number;
        Padding?: RecursivePartial<UE.Margin>;
        IsCaretMovedWhenGainFocus?: boolean;
        SelectAllTextWhenFocused?: boolean;
        RevertTextOnEscape?: boolean;
        ClearKeyboardFocusOnCommit?: boolean;
        SelectAllTextOnCommit?: boolean;
        AllowContextMenu?: boolean;
        KeyboardType?: UE.EVirtualKeyboardType;
        VirtualKeyboardOptions?: RecursivePartial<UE.VirtualKeyboardOptions>;
        VirtualKeyboardDismissAction?: UE.EVirtualKeyboardDismissAction;
        Justification?: UE.ETextJustify;
        ShapedTextOptions?: RecursivePartial<UE.ShapedTextOptions>;
        OnTextChanged?: (Text: string) => void;
        OnTextCommitted?: (Text: string, CommitMethod: UE.ETextCommit) => void;
    }

    class EditableTextBox extends React.Component<EditableTextBoxProps> {
        nativePtr: UE.EditableTextBox;
    }

    interface ExpandableAreaProps extends WidgetProps {
        Style?: RecursivePartial<UE.ExpandableAreaStyle>;
        BorderBrush?: RecursivePartial<UE.SlateBrush>;
        BorderColor?: RecursivePartial<UE.SlateColor>;
        bIsExpanded?: boolean;
        MaxHeight?: number;
        HeaderPadding?: RecursivePartial<UE.Margin>;
        AreaPadding?: RecursivePartial<UE.Margin>;
    }

    class ExpandableArea extends React.Component<ExpandableAreaProps> {
        nativePtr: UE.ExpandableArea;
    }

    interface GridPanelProps extends PanelWidgetProps {
        ColumnFill?: TArray<number>;
        RowFill?: TArray<number>;
    }

    class GridPanel extends React.Component<GridPanelProps> {
        nativePtr: UE.GridPanel;
    }

    interface HorizontalBoxProps extends PanelWidgetProps {
    }

    class HorizontalBox extends React.Component<HorizontalBoxProps> {
        nativePtr: UE.HorizontalBox;
    }

    interface ImageProps extends WidgetProps {
        Brush?: RecursivePartial<UE.SlateBrush>;
        BrushDelegate?: () => UE.SlateBrush;
        ColorAndOpacity?: RecursivePartial<UE.LinearColor>;
        ColorAndOpacityDelegate?: () => UE.LinearColor;
        bFlipForRightToLeftFlowDirection?: boolean;
        OnMouseButtonDownEvent?: (MyGeometry: UE.Geometry, MouseEvent: UE.PointerEvent) => UE.EventReply;
    }

    class Image extends React.Component<ImageProps> {
        nativePtr: UE.Image;
    }

    interface InputKeySelectorProps extends WidgetProps {
        WidgetStyle?: RecursivePartial<UE.ButtonStyle>;
        TextStyle?: RecursivePartial<UE.TextBlockStyle>;
        SelectedKey?: RecursivePartial<UE.InputChord>;
        Font?: RecursivePartial<UE.SlateFontInfo>;
        Margin?: RecursivePartial<UE.Margin>;
        ColorAndOpacity?: RecursivePartial<UE.LinearColor>;
        KeySelectionText?: string;
        NoKeySpecifiedText?: string;
        bAllowModifierKeys?: boolean;
        bAllowGamepadKeys?: boolean;
        EscapeKeys?: TArray<UE.Key>;
        OnKeySelected?: (SelectedKey: UE.InputChord) => void;
        OnIsSelectingKeyChanged?: () => void;
    }

    class InputKeySelector extends React.Component<InputKeySelectorProps> {
        nativePtr: UE.InputKeySelector;
    }

    interface InvalidationBoxProps extends ContentWidgetProps {
        bCanCache?: boolean;
        CacheRelativeTransforms?: boolean;
    }

    class InvalidationBox extends React.Component<InvalidationBoxProps> {
        nativePtr: UE.InvalidationBox;
    }

    interface ListViewBaseProps extends WidgetProps {
        WheelScrollMultiplier?: number;
        bEnableScrollAnimation?: boolean;
        bEnableFixedLineOffset?: boolean;
        FixedLineScrollOffset?: number;
        NumDesignerPreviewEntries?: number;
        EntryWidgetPool?: RecursivePartial<UE.UserWidgetPool>;
    }

    class ListViewBase extends React.Component<ListViewBaseProps> {
        nativePtr: UE.ListViewBase;
    }

    interface ListViewProps extends ListViewBaseProps {
        Orientation?: UE.EOrientation;
        SelectionMode?: UE.ESelectionMode;
        ConsumeMouseWheel?: UE.EConsumeMouseWheel;
        bClearSelectionOnClick?: boolean;
        bIsFocusable?: boolean;
        EntrySpacing?: number;
        bReturnFocusToSelection?: boolean;
    }

    class ListView extends React.Component<ListViewProps> {
        nativePtr: UE.ListView;
    }

    interface MenuAnchorProps extends ContentWidgetProps {
        Placement?: UE.EMenuPlacement;
        bFitInWindow?: boolean;
        ShouldDeferPaintingAfterWindowContent?: boolean;
        UseApplicationMenuStack?: boolean;
        OnMenuOpenChanged?: (bIsOpen: boolean) => void;
    }

    class MenuAnchor extends React.Component<MenuAnchorProps> {
        nativePtr: UE.MenuAnchor;
    }

    interface TextLayoutWidgetProps extends WidgetProps {
        ShapedTextOptions?: RecursivePartial<UE.ShapedTextOptions>;
        Justification?: UE.ETextJustify;
        WrappingPolicy?: UE.ETextWrappingPolicy;
        AutoWrapText?: boolean;
        WrapTextAt?: number;
        Margin?: RecursivePartial<UE.Margin>;
        LineHeightPercentage?: number;
    }

    class TextLayoutWidget extends React.Component<TextLayoutWidgetProps> {
        nativePtr: UE.TextLayoutWidget;
    }

    interface MultiLineEditableTextProps extends TextLayoutWidgetProps {
        Text?: string;
        HintText?: string;
        HintTextDelegate?: () => string;
        WidgetStyle?: RecursivePartial<UE.TextBlockStyle>;
        bIsReadOnly?: boolean;
        Font?: RecursivePartial<UE.SlateFontInfo>;
        SelectAllTextWhenFocused?: boolean;
        ClearTextSelectionOnFocusLoss?: boolean;
        RevertTextOnEscape?: boolean;
        ClearKeyboardFocusOnCommit?: boolean;
        AllowContextMenu?: boolean;
        VirtualKeyboardOptions?: RecursivePartial<UE.VirtualKeyboardOptions>;
        VirtualKeyboardDismissAction?: UE.EVirtualKeyboardDismissAction;
        OnTextChanged?: (Text: string) => void;
        OnTextCommitted?: (Text: string, CommitMethod: UE.ETextCommit) => void;
    }

    class MultiLineEditableText extends React.Component<MultiLineEditableTextProps> {
        nativePtr: UE.MultiLineEditableText;
    }

    interface MultiLineEditableTextBoxProps extends TextLayoutWidgetProps {
        Text?: string;
        HintText?: string;
        HintTextDelegate?: () => string;
        WidgetStyle?: RecursivePartial<UE.EditableTextBoxStyle>;
        TextStyle?: RecursivePartial<UE.TextBlockStyle>;
        bIsReadOnly?: boolean;
        AllowContextMenu?: boolean;
        VirtualKeyboardOptions?: RecursivePartial<UE.VirtualKeyboardOptions>;
        VirtualKeyboardDismissAction?: UE.EVirtualKeyboardDismissAction;
        Font?: RecursivePartial<UE.SlateFontInfo>;
        ForegroundColor?: RecursivePartial<UE.LinearColor>;
        BackgroundColor?: RecursivePartial<UE.LinearColor>;
        ReadOnlyForegroundColor?: RecursivePartial<UE.LinearColor>;
        OnTextChanged?: (Text: string) => void;
        OnTextCommitted?: (Text: string, CommitMethod: UE.ETextCommit) => void;
    }

    class MultiLineEditableTextBox extends React.Component<MultiLineEditableTextBoxProps> {
        nativePtr: UE.MultiLineEditableTextBox;
    }

    interface NamedSlotProps extends ContentWidgetProps {
    }

    class NamedSlot extends React.Component<NamedSlotProps> {
        nativePtr: UE.NamedSlot;
    }

    interface NativeWidgetHostProps extends WidgetProps {
    }

    class NativeWidgetHost extends React.Component<NativeWidgetHostProps> {
        nativePtr: UE.NativeWidgetHost;
    }

    interface OverlayProps extends PanelWidgetProps {
    }

    class Overlay extends React.Component<OverlayProps> {
        nativePtr: UE.Overlay;
    }

    interface ProgressBarProps extends WidgetProps {
        WidgetStyle?: RecursivePartial<UE.ProgressBarStyle>;
        Percent?: number;
        BarFillType?: UE.EProgressBarFillType;
        bIsMarquee?: boolean;
        BorderPadding?: RecursivePartial<UE.Vector2D>;
        PercentDelegate?: () => number;
        FillColorAndOpacity?: RecursivePartial<UE.LinearColor>;
        FillColorAndOpacityDelegate?: () => UE.LinearColor;
    }

    class ProgressBar extends React.Component<ProgressBarProps> {
        nativePtr: UE.ProgressBar;
    }

    interface RetainerBoxProps extends ContentWidgetProps {
        RenderOnInvalidation?: boolean;
        RenderOnPhase?: boolean;
        Phase?: number;
        PhaseCount?: number;
        TextureParameter?: string;
    }

    class RetainerBox extends React.Component<RetainerBoxProps> {
        nativePtr: UE.RetainerBox;
    }

    interface RichTextBlockProps extends TextLayoutWidgetProps {
        Text?: string;
        bOverrideDefaultStyle?: boolean;
        DefaultTextStyleOverride?: RecursivePartial<UE.TextBlockStyle>;
        MinDesiredWidth?: number;
    }

    class RichTextBlock extends React.Component<RichTextBlockProps> {
        nativePtr: UE.RichTextBlock;
    }

    interface SafeZoneProps extends ContentWidgetProps {
        PadLeft?: boolean;
        PadRight?: boolean;
        PadTop?: boolean;
        PadBottom?: boolean;
    }

    class SafeZone extends React.Component<SafeZoneProps> {
        nativePtr: UE.SafeZone;
    }

    interface ScaleBoxProps extends ContentWidgetProps {
        Stretch?: UE.EStretch;
        StretchDirection?: UE.EStretchDirection;
        UserSpecifiedScale?: number;
        IgnoreInheritedScale?: boolean;
    }

    class ScaleBox extends React.Component<ScaleBoxProps> {
        nativePtr: UE.ScaleBox;
    }

    interface ScrollBarProps extends WidgetProps {
        WidgetStyle?: RecursivePartial<UE.ScrollBarStyle>;
        bAlwaysShowScrollbar?: boolean;
        bAlwaysShowScrollbarTrack?: boolean;
        Orientation?: UE.EOrientation;
        Thickness?: RecursivePartial<UE.Vector2D>;
        Padding?: RecursivePartial<UE.Margin>;
    }

    class ScrollBar extends React.Component<ScrollBarProps> {
        nativePtr: UE.ScrollBar;
    }

    interface ScrollBoxProps extends PanelWidgetProps {
        WidgetStyle?: RecursivePartial<UE.ScrollBoxStyle>;
        WidgetBarStyle?: RecursivePartial<UE.ScrollBarStyle>;
        Orientation?: UE.EOrientation;
        ScrollBarVisibility?: UE.ESlateVisibility;
        ConsumeMouseWheel?: UE.EConsumeMouseWheel;
        ScrollbarThickness?: RecursivePartial<UE.Vector2D>;
        ScrollbarPadding?: RecursivePartial<UE.Margin>;
        AlwaysShowScrollbar?: boolean;
        AlwaysShowScrollbarTrack?: boolean;
        AllowOverscroll?: boolean;
        bAnimateWheelScrolling?: boolean;
        NavigationDestination?: UE.EDescendantScrollDestination;
        NavigationScrollPadding?: number;
        bAllowRightClickDragScrolling?: boolean;
        WheelScrollMultiplier?: number;
        OnUserScrolled?: (CurrentOffset: number) => void;
    }

    class ScrollBox extends React.Component<ScrollBoxProps> {
        nativePtr: UE.ScrollBox;
    }

    interface SizeBoxProps extends ContentWidgetProps {
        WidthOverride?: number;
        HeightOverride?: number;
        MinDesiredWidth?: number;
        MinDesiredHeight?: number;
        MaxDesiredWidth?: number;
        MaxDesiredHeight?: number;
        MinAspectRatio?: number;
        MaxAspectRatio?: number;
        bOverride_WidthOverride?: boolean;
        bOverride_HeightOverride?: boolean;
        bOverride_MinDesiredWidth?: boolean;
        bOverride_MinDesiredHeight?: boolean;
        bOverride_MaxDesiredWidth?: boolean;
        bOverride_MaxDesiredHeight?: boolean;
        bOverride_MinAspectRatio?: boolean;
        bOverride_MaxAspectRatio?: boolean;
    }

    class SizeBox extends React.Component<SizeBoxProps> {
        nativePtr: UE.SizeBox;
    }

    interface SliderProps extends WidgetProps {
        Value?: number;
        ValueDelegate?: () => number;
        MinValue?: number;
        MaxValue?: number;
        WidgetStyle?: RecursivePartial<UE.SliderStyle>;
        Orientation?: UE.EOrientation;
        SliderBarColor?: RecursivePartial<UE.LinearColor>;
        SliderHandleColor?: RecursivePartial<UE.LinearColor>;
        IndentHandle?: boolean;
        Locked?: boolean;
        MouseUsesStep?: boolean;
        RequiresControllerLock?: boolean;
        StepSize?: number;
        IsFocusable?: boolean;
        OnMouseCaptureBegin?: () => void;
        OnMouseCaptureEnd?: () => void;
        OnControllerCaptureBegin?: () => void;
        OnControllerCaptureEnd?: () => void;
        OnValueChanged?: (Value: number) => void;
    }

    class Slider extends React.Component<SliderProps> {
        nativePtr: UE.Slider;
    }

    interface SpacerProps extends WidgetProps {
        Size?: RecursivePartial<UE.Vector2D>;
    }

    class Spacer extends React.Component<SpacerProps> {
        nativePtr: UE.Spacer;
    }

    interface SpinBoxProps extends WidgetProps {
        Value?: number;
        ValueDelegate?: () => number;
        WidgetStyle?: RecursivePartial<UE.SpinBoxStyle>;
        Delta?: number;
        SliderExponent?: number;
        Font?: RecursivePartial<UE.SlateFontInfo>;
        Justification?: UE.ETextJustify;
        MinDesiredWidth?: number;
        ClearKeyboardFocusOnCommit?: boolean;
        SelectAllTextOnCommit?: boolean;
        ForegroundColor?: RecursivePartial<UE.SlateColor>;
        OnValueChanged?: (InValue: number) => void;
        OnValueCommitted?: (InValue: number, CommitMethod: UE.ETextCommit) => void;
        OnBeginSliderMovement?: () => void;
        OnEndSliderMovement?: (InValue: number) => void;
        bOverride_MinValue?: boolean;
        bOverride_MaxValue?: boolean;
        bOverride_MinSliderValue?: boolean;
        bOverride_MaxSliderValue?: boolean;
        MinValue?: number;
        MaxValue?: number;
        MinSliderValue?: number;
        MaxSliderValue?: number;
    }

    class SpinBox extends React.Component<SpinBoxProps> {
        nativePtr: UE.SpinBox;
    }

    interface TextBlockProps extends TextLayoutWidgetProps {
        Text?: string;
        TextDelegate?: () => string;
        ColorAndOpacity?: RecursivePartial<UE.SlateColor>;
        ColorAndOpacityDelegate?: () => UE.SlateColor;
        Font?: RecursivePartial<UE.SlateFontInfo>;
        StrikeBrush?: RecursivePartial<UE.SlateBrush>;
        ShadowOffset?: RecursivePartial<UE.Vector2D>;
        ShadowColorAndOpacity?: RecursivePartial<UE.LinearColor>;
        ShadowColorAndOpacityDelegate?: () => UE.LinearColor;
        MinDesiredWidth?: number;
        bWrapWithInvalidationPanel?: boolean;
        bAutoWrapText?: boolean;
        bSimpleTextMode?: boolean;
    }

    class TextBlock extends React.Component<TextBlockProps> {
        nativePtr: UE.TextBlock;
    }

    interface ThrobberProps extends WidgetProps {
        NumberOfPieces?: number;
        bAnimateHorizontally?: boolean;
        bAnimateVertically?: boolean;
        bAnimateOpacity?: boolean;
        Image?: RecursivePartial<UE.SlateBrush>;
    }

    class Throbber extends React.Component<ThrobberProps> {
        nativePtr: UE.Throbber;
    }

    interface TileViewProps extends ListViewProps {
        EntryHeight?: number;
        EntryWidth?: number;
        TileAlignment?: UE.EListItemAlignment;
        bWrapHorizontalNavigation?: boolean;
    }

    class TileView extends React.Component<TileViewProps> {
        nativePtr: UE.TileView;
    }

    interface TreeViewProps extends ListViewProps {
    }

    class TreeView extends React.Component<TreeViewProps> {
        nativePtr: UE.TreeView;
    }

    interface UniformGridPanelProps extends PanelWidgetProps {
        SlotPadding?: RecursivePartial<UE.Margin>;
        MinDesiredSlotWidth?: number;
        MinDesiredSlotHeight?: number;
    }

    class UniformGridPanel extends React.Component<UniformGridPanelProps> {
        nativePtr: UE.UniformGridPanel;
    }

    interface VerticalBoxProps extends PanelWidgetProps {
    }

    class VerticalBox extends React.Component<VerticalBoxProps> {
        nativePtr: UE.VerticalBox;
    }

    interface ViewportProps extends ContentWidgetProps {
        BackgroundColor?: RecursivePartial<UE.LinearColor>;
    }

    class Viewport extends React.Component<ViewportProps> {
        nativePtr: UE.Viewport;
    }

    interface WidgetSwitcherProps extends PanelWidgetProps {
        ActiveWidgetIndex?: number;
    }

    class WidgetSwitcher extends React.Component<WidgetSwitcherProps> {
        nativePtr: UE.WidgetSwitcher;
    }

    interface WindowTitleBarAreaProps extends ContentWidgetProps {
        bWindowButtonsEnabled?: boolean;
        bDoubleClickTogglesFullscreen?: boolean;
    }

    class WindowTitleBarArea extends React.Component<WindowTitleBarAreaProps> {
        nativePtr: UE.WindowTitleBarArea;
    }

    interface WrapBoxProps extends PanelWidgetProps {
        InnerSlotPadding?: RecursivePartial<UE.Vector2D>;
        WrapWidth?: number;
        bExplicitWrapWidth?: boolean;
    }

    class WrapBox extends React.Component<WrapBoxProps> {
        nativePtr: UE.WrapBox;
    }

    interface LevelSequenceBurnInProps extends UserWidgetProps {
        FrameInformation?: RecursivePartial<UE.LevelSequencePlayerSnapshot>;
    }

    class LevelSequenceBurnIn extends React.Component<LevelSequenceBurnInProps> {
        nativePtr: UE.LevelSequenceBurnIn;
    }

    interface PropertyViewBaseProps extends WidgetProps {
        SoftObjectPath?: RecursivePartial<UE.SoftObjectPath>;
        bAutoLoadAsset?: boolean;
        OnPropertyChanged?: (PropertyName: string) => void;
    }

    class PropertyViewBase extends React.Component<PropertyViewBaseProps> {
        nativePtr: UE.PropertyViewBase;
    }

    interface DetailsViewProps extends PropertyViewBaseProps {
        bAllowFiltering?: boolean;
        bAllowFavoriteSystem?: boolean;
        bShowModifiedPropertiesOption?: boolean;
        bShowKeyablePropertiesOption?: boolean;
        bShowAnimatedPropertiesOption?: boolean;
        ColumnWidth?: number;
        bShowScrollBar?: boolean;
        bForceHiddenPropertyVisibility?: boolean;
        ViewIdentifier?: string;
        CategoriesToShow?: TArray<string>;
        PropertiesToShow?: TArray<string>;
        bShowOnlyWhitelisted?: boolean;
    }

    class DetailsView extends React.Component<DetailsViewProps> {
        nativePtr: UE.DetailsView;
    }

    interface SinglePropertyViewProps extends PropertyViewBaseProps {
        PropertyName?: string;
        NameOverride?: string;
    }

    class SinglePropertyView extends React.Component<SinglePropertyViewProps> {
        nativePtr: UE.SinglePropertyView;
    }

    interface EditorUtilityWidgetProps extends UserWidgetProps {
        HelpText?: string;
        bAlwaysReregisterWithWindowsMenu?: boolean;
        bAutoRunDefaultAction?: boolean;
    }

    class EditorUtilityWidget extends React.Component<EditorUtilityWidgetProps> {
        nativePtr: UE.EditorUtilityWidget;
    }

    interface ReactWidgetProps extends UserWidgetProps {
    }

    class ReactWidget extends React.Component<ReactWidgetProps> {
        nativePtr: UE.ReactWidget;
    }

    interface TextureImageProps extends ImageProps {
        bMatchSize?: boolean;
        TextureName?: string;
    }

    class TextureImage extends React.Component<TextureImageProps> {
        nativePtr: UE.TextureImage;
    }

    interface TestWidgetBlueprint_CProps extends UserWidgetProps {
    }

    class TestWidgetBlueprint_C extends React.Component<TestWidgetBlueprint_CProps> {
        nativePtr: UE.Game.StarterContent.TestWidgetBlueprint.TestWidgetBlueprint_C;
    }


    interface Root {
        removeFromViewport() : void;
        getWidget(): any;
    }

    interface TReactUMG {
        render(element: React.ReactElement) : Root;
        init(world: any) : void;
    }

    var ReactUMG : TReactUMG;
}    
    