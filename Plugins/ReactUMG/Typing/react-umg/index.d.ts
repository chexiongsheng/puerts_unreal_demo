declare module "react-umg" {
    import * as React from 'react';
    import * as UE from 'ue';
    type TArray<T> = UE.TArray<T>;
    type TSet<T> = UE.TSet<T>;
    type TMap<TKey, TValue> = UE.TMap<TKey, TValue>;

    interface PanelSlot {
    }

    interface Margin {
        Left?: number;
        Top?: number;
        Right?: number;
        Bottom?: number;
    }

    interface BackgroundBlurSlot extends PanelSlot {
        Padding?: UE.Margin;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface BorderSlot extends PanelSlot {
        Padding?: UE.Margin;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface ButtonSlot extends PanelSlot {
        Padding?: UE.Margin;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface Vector2D {
        X?: number;
        Y?: number;
    }

    interface Anchors {
        Minimum?: UE.Vector2D;
        Maximum?: UE.Vector2D;
    }

    interface AnchorData {
        Offsets?: UE.Margin;
        Anchors?: UE.Anchors;
        Alignment?: UE.Vector2D;
    }

    interface CanvasPanelSlot extends PanelSlot {
        LayoutData?: UE.AnchorData;
        bAutoSize?: boolean;
        ZOrder?: number;
    }

    interface GridSlot extends PanelSlot {
        Padding?: UE.Margin;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
        Row?: number;
        RowSpan?: number;
        Column?: number;
        ColumnSpan?: number;
        Layer?: number;
        Nudge?: UE.Vector2D;
    }

    interface SlateChildSize {
        Value?: number;
        SizeRule?: UE.ESlateSizeRule;
    }

    interface HorizontalBoxSlot extends PanelSlot {
        Padding?: UE.Margin;
        Size?: UE.SlateChildSize;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface OverlaySlot extends PanelSlot {
        Padding?: UE.Margin;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface SafeZoneSlot extends PanelSlot {
        bIsTitleSafe?: boolean;
        SafeAreaScale?: UE.Margin;
        HAlign?: UE.EHorizontalAlignment;
        VAlign?: UE.EVerticalAlignment;
        Padding?: UE.Margin;
    }

    interface ScaleBoxSlot extends PanelSlot {
        Padding?: UE.Margin;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface ScrollBoxSlot extends PanelSlot {
        Padding?: UE.Margin;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface SizeBoxSlot extends PanelSlot {
        Padding?: UE.Margin;
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
        Size?: UE.SlateChildSize;
        Padding?: UE.Margin;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface WidgetSwitcherSlot extends PanelSlot {
        Padding?: UE.Margin;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface WindowTitleBarAreaSlot extends PanelSlot {
        Padding?: UE.Margin;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface WrapBoxSlot extends PanelSlot {
        Padding?: UE.Margin;
        bFillEmptySpace?: boolean;
        FillSpanWhenLessThan?: number;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    export interface Props {
        Slot ? : PanelSlot;
    }

    interface WidgetTransform {
        Translation?: UE.Vector2D;
        Scale?: UE.Vector2D;
        Shear?: UE.Vector2D;
        Angle?: number;
    }

    interface WidgetProps extends Props {
        bIsEnabledDelegate?: () => boolean;
        ToolTipText?: string;
        ToolTipTextDelegate?: () => string;
        VisibilityDelegate?: () => UE.ESlateVisibility;
        RenderTransform?: UE.WidgetTransform;
        RenderTransformPivot?: UE.Vector2D;
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

    interface LinearColor {
        R?: number;
        G?: number;
        B?: number;
        A?: number;
    }

    interface SlateColor {
        SpecifiedColor?: UE.LinearColor;
        ColorUseRule?: UE.ESlateColorStylingMode;
    }

    interface NamedSlotBinding {
        Name?: string;
    }

    interface AnimationEventBinding {
        AnimationEvent?: UE.EWidgetAnimationEvent;
        UserTag?: string;
    }

    interface UserWidgetProps extends WidgetProps {
        ColorAndOpacity?: UE.LinearColor;
        ColorAndOpacityDelegate?: () => UE.LinearColor;
        ForegroundColor?: UE.SlateColor;
        ForegroundColorDelegate?: () => UE.SlateColor;
        Padding?: UE.Margin;
        NamedSlotBindings?: TArray<UE.NamedSlotBinding>;
        DesignTimeSize?: UE.Vector2D;
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

    interface Box2D {
        Min?: UE.Vector2D;
        Max?: UE.Vector2D;
        bIsValid?: number;
    }

    interface SlateBrush {
        ImageSize?: UE.Vector2D;
        Margin?: UE.Margin;
        Tint?: UE.LinearColor;
        TintColor?: UE.SlateColor;
        ResourceName?: string;
        UVRegion?: UE.Box2D;
        DrawAs?: UE.ESlateBrushDrawType;
        Tiling?: UE.ESlateBrushTileType;
        Mirroring?: UE.ESlateBrushMirrorType;
        ImageType?: UE.ESlateBrushImageType;
        bIsDynamicallyLoaded?: boolean;
        bHasUObject?: boolean;
    }

    interface BackgroundBlurProps extends ContentWidgetProps {
        Padding?: UE.Margin;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
        bApplyAlphaToBlur?: boolean;
        BlurStrength?: number;
        bOverrideAutoRadiusCalculation?: boolean;
        BlurRadius?: number;
        LowQualityFallbackBrush?: UE.SlateBrush;
    }

    class BackgroundBlur extends React.Component<BackgroundBlurProps> {
        nativePtr: UE.BackgroundBlur;
    }

    interface Geometry {
    }

    interface InputEvent {
    }

    interface PointerEvent extends InputEvent {
    }

    interface EventReply {
    }

    interface BorderProps extends ContentWidgetProps {
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
        bShowEffectWhenDisabled?: boolean;
        ContentColorAndOpacity?: UE.LinearColor;
        ContentColorAndOpacityDelegate?: () => UE.LinearColor;
        Padding?: UE.Margin;
        Background?: UE.SlateBrush;
        BackgroundDelegate?: () => UE.SlateBrush;
        BrushColor?: UE.LinearColor;
        BrushColorDelegate?: () => UE.LinearColor;
        DesiredSizeScale?: UE.Vector2D;
        bFlipForRightToLeftFlowDirection?: boolean;
        OnMouseButtonDownEvent?: (MyGeometry: UE.Geometry, MouseEvent: UE.PointerEvent) => UE.EventReply;
        OnMouseButtonUpEvent?: (MyGeometry: UE.Geometry, MouseEvent: UE.PointerEvent) => UE.EventReply;
        OnMouseMoveEvent?: (MyGeometry: UE.Geometry, MouseEvent: UE.PointerEvent) => UE.EventReply;
        OnMouseDoubleClickEvent?: (MyGeometry: UE.Geometry, MouseEvent: UE.PointerEvent) => UE.EventReply;
    }

    class Border extends React.Component<BorderProps> {
        nativePtr: UE.Border;
    }

    interface SlateWidgetStyle {
    }

    interface SlateSound {
    }

    interface ButtonStyle extends SlateWidgetStyle {
        Normal?: UE.SlateBrush;
        Hovered?: UE.SlateBrush;
        Pressed?: UE.SlateBrush;
        Disabled?: UE.SlateBrush;
        NormalPadding?: UE.Margin;
        PressedPadding?: UE.Margin;
        PressedSlateSound?: UE.SlateSound;
        HoveredSlateSound?: UE.SlateSound;
        PressedSound?: string;
        HoveredSound?: string;
    }

    interface ButtonProps extends ContentWidgetProps {
        WidgetStyle?: UE.ButtonStyle;
        ColorAndOpacity?: UE.LinearColor;
        BackgroundColor?: UE.LinearColor;
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

    interface CheckBoxStyle extends SlateWidgetStyle {
        CheckBoxType?: UE.ESlateCheckBoxType;
        UncheckedImage?: UE.SlateBrush;
        UncheckedHoveredImage?: UE.SlateBrush;
        UncheckedPressedImage?: UE.SlateBrush;
        CheckedImage?: UE.SlateBrush;
        CheckedHoveredImage?: UE.SlateBrush;
        CheckedPressedImage?: UE.SlateBrush;
        UndeterminedImage?: UE.SlateBrush;
        UndeterminedHoveredImage?: UE.SlateBrush;
        UndeterminedPressedImage?: UE.SlateBrush;
        Padding?: UE.Margin;
        ForegroundColor?: UE.SlateColor;
        BorderBackgroundColor?: UE.SlateColor;
        CheckedSlateSound?: UE.SlateSound;
        UncheckedSlateSound?: UE.SlateSound;
        HoveredSlateSound?: UE.SlateSound;
        CheckedSound?: string;
        UncheckedSound?: string;
        HoveredSound?: string;
    }

    interface CheckBoxProps extends ContentWidgetProps {
        CheckedState?: UE.ECheckBoxState;
        CheckedStateDelegate?: () => UE.ECheckBoxState;
        WidgetStyle?: UE.CheckBoxStyle;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        Padding?: UE.Margin;
        BorderBackgroundColor?: UE.SlateColor;
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
        Image?: UE.SlateBrush;
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

    interface ComboButtonStyle extends SlateWidgetStyle {
        ButtonStyle?: UE.ButtonStyle;
        DownArrowImage?: UE.SlateBrush;
        MenuBorderBrush?: UE.SlateBrush;
        MenuBorderPadding?: UE.Margin;
    }

    interface ComboBoxStyle extends SlateWidgetStyle {
        ComboButtonStyle?: UE.ComboButtonStyle;
        PressedSlateSound?: UE.SlateSound;
        SelectionChangeSlateSound?: UE.SlateSound;
        PressedSound?: string;
        SelectionChangeSound?: string;
    }

    interface TableRowStyle extends SlateWidgetStyle {
        SelectorFocusedBrush?: UE.SlateBrush;
        ActiveHoveredBrush?: UE.SlateBrush;
        ActiveBrush?: UE.SlateBrush;
        InactiveHoveredBrush?: UE.SlateBrush;
        InactiveBrush?: UE.SlateBrush;
        EvenRowBackgroundHoveredBrush?: UE.SlateBrush;
        EvenRowBackgroundBrush?: UE.SlateBrush;
        OddRowBackgroundHoveredBrush?: UE.SlateBrush;
        OddRowBackgroundBrush?: UE.SlateBrush;
        TextColor?: UE.SlateColor;
        SelectedTextColor?: UE.SlateColor;
        DropIndicator_Above?: UE.SlateBrush;
        DropIndicator_Onto?: UE.SlateBrush;
        DropIndicator_Below?: UE.SlateBrush;
        ActiveHighlightedBrush?: UE.SlateBrush;
        InactiveHighlightedBrush?: UE.SlateBrush;
    }

    interface FontOutlineSettings {
        OutlineSize?: number;
        bSeparateFillAlpha?: boolean;
        bApplyOutlineToDropShadows?: boolean;
        OutlineColor?: UE.LinearColor;
    }

    interface SlateFontInfo {
        OutlineSettings?: UE.FontOutlineSettings;
        TypefaceFontName?: string;
        Size?: number;
        FontName?: string;
        Hinting?: UE.EFontHinting;
    }

    interface ComboBoxStringProps extends WidgetProps {
        DefaultOptions?: TArray<string>;
        SelectedOption?: string;
        WidgetStyle?: UE.ComboBoxStyle;
        ItemStyle?: UE.TableRowStyle;
        ContentPadding?: UE.Margin;
        MaxListHeight?: number;
        HasDownArrow?: boolean;
        EnableGamepadNavigationMode?: boolean;
        Font?: UE.SlateFontInfo;
        ForegroundColor?: UE.SlateColor;
        bIsFocusable?: boolean;
        OnSelectionChanged?: (SelectedItem: string, SelectionType: UE.ESelectInfo) => void;
        OnOpening?: () => void;
    }

    class ComboBoxString extends React.Component<ComboBoxStringProps> {
        nativePtr: UE.ComboBoxString;
    }

    interface UserWidgetPool {
    }

    interface DynamicEntryBoxBaseProps extends WidgetProps {
        EntryBoxType?: UE.EDynamicBoxType;
        EntrySpacing?: UE.Vector2D;
        SpacingPattern?: TArray<UE.Vector2D>;
        EntrySizeRule?: UE.SlateChildSize;
        EntryHorizontalAlignment?: UE.EHorizontalAlignment;
        EntryVerticalAlignment?: UE.EVerticalAlignment;
        MaxElementSize?: number;
        EntryWidgetPool?: UE.UserWidgetPool;
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

    interface EditableTextStyle extends SlateWidgetStyle {
        Font?: UE.SlateFontInfo;
        ColorAndOpacity?: UE.SlateColor;
        BackgroundImageSelected?: UE.SlateBrush;
        BackgroundImageComposing?: UE.SlateBrush;
        CaretImage?: UE.SlateBrush;
    }

    interface VirtualKeyboardOptions {
        bEnableAutocorrect?: boolean;
    }

    interface ShapedTextOptions {
        bOverride_TextShapingMethod?: boolean;
        bOverride_TextFlowDirection?: boolean;
        TextShapingMethod?: UE.ETextShapingMethod;
        TextFlowDirection?: UE.ETextFlowDirection;
    }

    interface EditableTextProps extends WidgetProps {
        Text?: string;
        TextDelegate?: () => string;
        HintText?: string;
        HintTextDelegate?: () => string;
        WidgetStyle?: UE.EditableTextStyle;
        Font?: UE.SlateFontInfo;
        ColorAndOpacity?: UE.SlateColor;
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
        VirtualKeyboardOptions?: UE.VirtualKeyboardOptions;
        VirtualKeyboardDismissAction?: UE.EVirtualKeyboardDismissAction;
        Justification?: UE.ETextJustify;
        ShapedTextOptions?: UE.ShapedTextOptions;
        OnTextChanged?: (Text: string) => void;
        OnTextCommitted?: (Text: string, CommitMethod: UE.ETextCommit) => void;
    }

    class EditableText extends React.Component<EditableTextProps> {
        nativePtr: UE.EditableText;
    }

    interface ScrollBarStyle extends SlateWidgetStyle {
        HorizontalBackgroundImage?: UE.SlateBrush;
        VerticalBackgroundImage?: UE.SlateBrush;
        VerticalTopSlotImage?: UE.SlateBrush;
        HorizontalTopSlotImage?: UE.SlateBrush;
        VerticalBottomSlotImage?: UE.SlateBrush;
        HorizontalBottomSlotImage?: UE.SlateBrush;
        NormalThumbImage?: UE.SlateBrush;
        HoveredThumbImage?: UE.SlateBrush;
        DraggedThumbImage?: UE.SlateBrush;
    }

    interface EditableTextBoxStyle extends SlateWidgetStyle {
        BackgroundImageNormal?: UE.SlateBrush;
        BackgroundImageHovered?: UE.SlateBrush;
        BackgroundImageFocused?: UE.SlateBrush;
        BackgroundImageReadOnly?: UE.SlateBrush;
        Padding?: UE.Margin;
        Font?: UE.SlateFontInfo;
        ForegroundColor?: UE.SlateColor;
        BackgroundColor?: UE.SlateColor;
        ReadOnlyForegroundColor?: UE.SlateColor;
        HScrollBarPadding?: UE.Margin;
        VScrollBarPadding?: UE.Margin;
        ScrollBarStyle?: UE.ScrollBarStyle;
    }

    interface EditableTextBoxProps extends WidgetProps {
        Text?: string;
        TextDelegate?: () => string;
        WidgetStyle?: UE.EditableTextBoxStyle;
        HintText?: string;
        HintTextDelegate?: () => string;
        Font?: UE.SlateFontInfo;
        ForegroundColor?: UE.LinearColor;
        BackgroundColor?: UE.LinearColor;
        ReadOnlyForegroundColor?: UE.LinearColor;
        IsReadOnly?: boolean;
        IsPassword?: boolean;
        MinimumDesiredWidth?: number;
        Padding?: UE.Margin;
        IsCaretMovedWhenGainFocus?: boolean;
        SelectAllTextWhenFocused?: boolean;
        RevertTextOnEscape?: boolean;
        ClearKeyboardFocusOnCommit?: boolean;
        SelectAllTextOnCommit?: boolean;
        AllowContextMenu?: boolean;
        KeyboardType?: UE.EVirtualKeyboardType;
        VirtualKeyboardOptions?: UE.VirtualKeyboardOptions;
        VirtualKeyboardDismissAction?: UE.EVirtualKeyboardDismissAction;
        Justification?: UE.ETextJustify;
        ShapedTextOptions?: UE.ShapedTextOptions;
        OnTextChanged?: (Text: string) => void;
        OnTextCommitted?: (Text: string, CommitMethod: UE.ETextCommit) => void;
    }

    class EditableTextBox extends React.Component<EditableTextBoxProps> {
        nativePtr: UE.EditableTextBox;
    }

    interface ExpandableAreaStyle extends SlateWidgetStyle {
        CollapsedImage?: UE.SlateBrush;
        ExpandedImage?: UE.SlateBrush;
        RolloutAnimationSeconds?: number;
    }

    interface ExpandableAreaProps extends WidgetProps {
        Style?: UE.ExpandableAreaStyle;
        BorderBrush?: UE.SlateBrush;
        BorderColor?: UE.SlateColor;
        bIsExpanded?: boolean;
        MaxHeight?: number;
        HeaderPadding?: UE.Margin;
        AreaPadding?: UE.Margin;
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
        Brush?: UE.SlateBrush;
        BrushDelegate?: () => UE.SlateBrush;
        ColorAndOpacity?: UE.LinearColor;
        ColorAndOpacityDelegate?: () => UE.LinearColor;
        bFlipForRightToLeftFlowDirection?: boolean;
        OnMouseButtonDownEvent?: (MyGeometry: UE.Geometry, MouseEvent: UE.PointerEvent) => UE.EventReply;
    }

    class Image extends React.Component<ImageProps> {
        nativePtr: UE.Image;
    }

    interface TextBlockStyle extends SlateWidgetStyle {
        Font?: UE.SlateFontInfo;
        ColorAndOpacity?: UE.SlateColor;
        ShadowOffset?: UE.Vector2D;
        ShadowColorAndOpacity?: UE.LinearColor;
        SelectedBackgroundColor?: UE.SlateColor;
        HighlightColor?: UE.LinearColor;
        HighlightShape?: UE.SlateBrush;
        StrikeBrush?: UE.SlateBrush;
        UnderlineBrush?: UE.SlateBrush;
    }

    interface Key {
        KeyName?: string;
    }

    interface InputChord {
        Key?: UE.Key;
        bShift?: boolean;
        bCtrl?: boolean;
        bAlt?: boolean;
        bCmd?: boolean;
    }

    interface InputKeySelectorProps extends WidgetProps {
        WidgetStyle?: UE.ButtonStyle;
        TextStyle?: UE.TextBlockStyle;
        SelectedKey?: UE.InputChord;
        Font?: UE.SlateFontInfo;
        Margin?: UE.Margin;
        ColorAndOpacity?: UE.LinearColor;
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
        EntryWidgetPool?: UE.UserWidgetPool;
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
        ShapedTextOptions?: UE.ShapedTextOptions;
        Justification?: UE.ETextJustify;
        WrappingPolicy?: UE.ETextWrappingPolicy;
        AutoWrapText?: boolean;
        WrapTextAt?: number;
        Margin?: UE.Margin;
        LineHeightPercentage?: number;
    }

    class TextLayoutWidget extends React.Component<TextLayoutWidgetProps> {
        nativePtr: UE.TextLayoutWidget;
    }

    interface MultiLineEditableTextProps extends TextLayoutWidgetProps {
        Text?: string;
        HintText?: string;
        HintTextDelegate?: () => string;
        WidgetStyle?: UE.TextBlockStyle;
        bIsReadOnly?: boolean;
        Font?: UE.SlateFontInfo;
        SelectAllTextWhenFocused?: boolean;
        ClearTextSelectionOnFocusLoss?: boolean;
        RevertTextOnEscape?: boolean;
        ClearKeyboardFocusOnCommit?: boolean;
        AllowContextMenu?: boolean;
        VirtualKeyboardOptions?: UE.VirtualKeyboardOptions;
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
        WidgetStyle?: UE.EditableTextBoxStyle;
        TextStyle?: UE.TextBlockStyle;
        bIsReadOnly?: boolean;
        AllowContextMenu?: boolean;
        VirtualKeyboardOptions?: UE.VirtualKeyboardOptions;
        VirtualKeyboardDismissAction?: UE.EVirtualKeyboardDismissAction;
        Font?: UE.SlateFontInfo;
        ForegroundColor?: UE.LinearColor;
        BackgroundColor?: UE.LinearColor;
        ReadOnlyForegroundColor?: UE.LinearColor;
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

    interface ProgressBarStyle extends SlateWidgetStyle {
        BackgroundImage?: UE.SlateBrush;
        FillImage?: UE.SlateBrush;
        MarqueeImage?: UE.SlateBrush;
    }

    interface ProgressBarProps extends WidgetProps {
        WidgetStyle?: UE.ProgressBarStyle;
        Percent?: number;
        BarFillType?: UE.EProgressBarFillType;
        bIsMarquee?: boolean;
        BorderPadding?: UE.Vector2D;
        PercentDelegate?: () => number;
        FillColorAndOpacity?: UE.LinearColor;
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
        DefaultTextStyleOverride?: UE.TextBlockStyle;
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
        WidgetStyle?: UE.ScrollBarStyle;
        bAlwaysShowScrollbar?: boolean;
        bAlwaysShowScrollbarTrack?: boolean;
        Orientation?: UE.EOrientation;
        Thickness?: UE.Vector2D;
        Padding?: UE.Margin;
    }

    class ScrollBar extends React.Component<ScrollBarProps> {
        nativePtr: UE.ScrollBar;
    }

    interface ScrollBoxStyle extends SlateWidgetStyle {
        TopShadowBrush?: UE.SlateBrush;
        BottomShadowBrush?: UE.SlateBrush;
        LeftShadowBrush?: UE.SlateBrush;
        RightShadowBrush?: UE.SlateBrush;
    }

    interface ScrollBoxProps extends PanelWidgetProps {
        WidgetStyle?: UE.ScrollBoxStyle;
        WidgetBarStyle?: UE.ScrollBarStyle;
        Orientation?: UE.EOrientation;
        ScrollBarVisibility?: UE.ESlateVisibility;
        ConsumeMouseWheel?: UE.EConsumeMouseWheel;
        ScrollbarThickness?: UE.Vector2D;
        ScrollbarPadding?: UE.Margin;
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

    interface SliderStyle extends SlateWidgetStyle {
        NormalBarImage?: UE.SlateBrush;
        HoveredBarImage?: UE.SlateBrush;
        DisabledBarImage?: UE.SlateBrush;
        NormalThumbImage?: UE.SlateBrush;
        HoveredThumbImage?: UE.SlateBrush;
        DisabledThumbImage?: UE.SlateBrush;
        BarThickness?: number;
    }

    interface SliderProps extends WidgetProps {
        Value?: number;
        ValueDelegate?: () => number;
        MinValue?: number;
        MaxValue?: number;
        WidgetStyle?: UE.SliderStyle;
        Orientation?: UE.EOrientation;
        SliderBarColor?: UE.LinearColor;
        SliderHandleColor?: UE.LinearColor;
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
        Size?: UE.Vector2D;
    }

    class Spacer extends React.Component<SpacerProps> {
        nativePtr: UE.Spacer;
    }

    interface SpinBoxStyle extends SlateWidgetStyle {
        BackgroundBrush?: UE.SlateBrush;
        HoveredBackgroundBrush?: UE.SlateBrush;
        ActiveFillBrush?: UE.SlateBrush;
        InactiveFillBrush?: UE.SlateBrush;
        ArrowsImage?: UE.SlateBrush;
        ForegroundColor?: UE.SlateColor;
        TextPadding?: UE.Margin;
    }

    interface SpinBoxProps extends WidgetProps {
        Value?: number;
        ValueDelegate?: () => number;
        WidgetStyle?: UE.SpinBoxStyle;
        Delta?: number;
        SliderExponent?: number;
        Font?: UE.SlateFontInfo;
        Justification?: UE.ETextJustify;
        MinDesiredWidth?: number;
        ClearKeyboardFocusOnCommit?: boolean;
        SelectAllTextOnCommit?: boolean;
        ForegroundColor?: UE.SlateColor;
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
        ColorAndOpacity?: UE.SlateColor;
        ColorAndOpacityDelegate?: () => UE.SlateColor;
        Font?: UE.SlateFontInfo;
        StrikeBrush?: UE.SlateBrush;
        ShadowOffset?: UE.Vector2D;
        ShadowColorAndOpacity?: UE.LinearColor;
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
        Image?: UE.SlateBrush;
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
        SlotPadding?: UE.Margin;
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
        BackgroundColor?: UE.LinearColor;
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
        InnerSlotPadding?: UE.Vector2D;
        WrapWidth?: number;
        bExplicitWrapWidth?: boolean;
    }

    class WrapBox extends React.Component<WrapBoxProps> {
        nativePtr: UE.WrapBox;
    }

    interface FrameNumber {
        Value?: number;
    }

    interface FrameTime {
        FrameNumber?: UE.FrameNumber;
        SubFrame?: number;
    }

    interface FrameRate {
        Numerator?: number;
        Denominator?: number;
    }

    interface QualifiedFrameTime {
        Time?: UE.FrameTime;
        Rate?: UE.FrameRate;
    }

    interface LevelSequenceSnapshotSettings {
        ZeroPadAmount?: number;
        FrameRate?: UE.FrameRate;
    }

    interface MovieSceneSequenceID {
        Value?: number;
    }

    interface LevelSequencePlayerSnapshot {
        MasterName?: string;
        MasterTime?: UE.QualifiedFrameTime;
        SourceTime?: UE.QualifiedFrameTime;
        CurrentShotName?: string;
        CurrentShotLocalTime?: UE.QualifiedFrameTime;
        CurrentShotSourceTime?: UE.QualifiedFrameTime;
        SourceTimecode?: string;
        Settings?: UE.LevelSequenceSnapshotSettings;
        ShotID?: UE.MovieSceneSequenceID;
    }

    interface LevelSequenceBurnInProps extends UserWidgetProps {
        FrameInformation?: UE.LevelSequencePlayerSnapshot;
    }

    class LevelSequenceBurnIn extends React.Component<LevelSequenceBurnInProps> {
        nativePtr: UE.LevelSequenceBurnIn;
    }

    interface SoftObjectPath {
        AssetPathName?: string;
        SubPathString?: string;
    }

    interface PropertyViewBaseProps extends WidgetProps {
        SoftObjectPath?: UE.SoftObjectPath;
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
    