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

    type EHorizontalAlignment = UE.EHorizontalAlignment;
    type EVerticalAlignment = UE.EVerticalAlignment;
    interface BackgroundBlurSlot extends PanelSlot {
        Padding?: Margin;
        HorizontalAlignment?: EHorizontalAlignment;
        VerticalAlignment?: EVerticalAlignment;
    }

    interface BorderSlot extends PanelSlot {
        Padding?: Margin;
        HorizontalAlignment?: EHorizontalAlignment;
        VerticalAlignment?: EVerticalAlignment;
    }

    interface ButtonSlot extends PanelSlot {
        Padding?: Margin;
        HorizontalAlignment?: EHorizontalAlignment;
        VerticalAlignment?: EVerticalAlignment;
    }

    interface Vector2D {
        X?: number;
        Y?: number;
    }

    interface Anchors {
        Minimum?: Vector2D;
        Maximum?: Vector2D;
    }

    interface AnchorData {
        Offsets?: Margin;
        Anchors?: Anchors;
        Alignment?: Vector2D;
    }

    interface CanvasPanelSlot extends PanelSlot {
        LayoutData?: AnchorData;
        bAutoSize?: boolean;
        ZOrder?: number;
    }

    interface GridSlot extends PanelSlot {
        Padding?: Margin;
        HorizontalAlignment?: EHorizontalAlignment;
        VerticalAlignment?: EVerticalAlignment;
        Row?: number;
        RowSpan?: number;
        Column?: number;
        ColumnSpan?: number;
        Layer?: number;
        Nudge?: Vector2D;
    }

    type ESlateSizeRule = UE.ESlateSizeRule;
    interface SlateChildSize {
        Value?: number;
        SizeRule?: ESlateSizeRule;
    }

    interface HorizontalBoxSlot extends PanelSlot {
        Padding?: Margin;
        Size?: SlateChildSize;
        HorizontalAlignment?: EHorizontalAlignment;
        VerticalAlignment?: EVerticalAlignment;
    }

    interface OverlaySlot extends PanelSlot {
        Padding?: Margin;
        HorizontalAlignment?: EHorizontalAlignment;
        VerticalAlignment?: EVerticalAlignment;
    }

    interface SafeZoneSlot extends PanelSlot {
        bIsTitleSafe?: boolean;
        SafeAreaScale?: Margin;
        HAlign?: EHorizontalAlignment;
        VAlign?: EVerticalAlignment;
        Padding?: Margin;
    }

    interface ScaleBoxSlot extends PanelSlot {
        Padding?: Margin;
        HorizontalAlignment?: EHorizontalAlignment;
        VerticalAlignment?: EVerticalAlignment;
    }

    interface ScrollBoxSlot extends PanelSlot {
        Padding?: Margin;
        HorizontalAlignment?: EHorizontalAlignment;
        VerticalAlignment?: EVerticalAlignment;
    }

    interface SizeBoxSlot extends PanelSlot {
        Padding?: Margin;
        HorizontalAlignment?: EHorizontalAlignment;
        VerticalAlignment?: EVerticalAlignment;
    }

    interface UniformGridSlot extends PanelSlot {
        HorizontalAlignment?: EHorizontalAlignment;
        VerticalAlignment?: EVerticalAlignment;
        Row?: number;
        Column?: number;
    }

    interface VerticalBoxSlot extends PanelSlot {
        Size?: SlateChildSize;
        Padding?: Margin;
        HorizontalAlignment?: EHorizontalAlignment;
        VerticalAlignment?: EVerticalAlignment;
    }

    interface WidgetSwitcherSlot extends PanelSlot {
        Padding?: Margin;
        HorizontalAlignment?: EHorizontalAlignment;
        VerticalAlignment?: EVerticalAlignment;
    }

    interface WindowTitleBarAreaSlot extends PanelSlot {
        Padding?: Margin;
        HorizontalAlignment?: EHorizontalAlignment;
        VerticalAlignment?: EVerticalAlignment;
    }

    interface WrapBoxSlot extends PanelSlot {
        Padding?: Margin;
        bFillEmptySpace?: boolean;
        FillSpanWhenLessThan?: number;
        HorizontalAlignment?: EHorizontalAlignment;
        VerticalAlignment?: EVerticalAlignment;
    }

    export interface Props {
        Slot ? : PanelSlot;
    }

    type ESlateVisibility = UE.ESlateVisibility;
    interface WidgetTransform {
        Translation?: Vector2D;
        Scale?: Vector2D;
        Shear?: Vector2D;
        Angle?: number;
    }

    type ESlateAccessibleBehavior = UE.ESlateAccessibleBehavior;
    type EMouseCursor = UE.EMouseCursor;
    type EWidgetClipping = UE.EWidgetClipping;
    type EFlowDirectionPreference = UE.EFlowDirectionPreference;
    interface WidgetProps extends Props {
        bIsEnabledDelegate?: () => boolean;
        ToolTipText?: string;
        ToolTipTextDelegate?: () => string;
        VisibilityDelegate?: () => ESlateVisibility;
        RenderTransform?: WidgetTransform;
        RenderTransformPivot?: Vector2D;
        bIsVariable?: boolean;
        bCreatedByConstructionScript?: boolean;
        bIsEnabled?: boolean;
        bOverride_Cursor?: boolean;
        bOverrideAccessibleDefaults?: boolean;
        bCanChildrenBeAccessible?: boolean;
        AccessibleBehavior?: ESlateAccessibleBehavior;
        AccessibleSummaryBehavior?: ESlateAccessibleBehavior;
        AccessibleText?: string;
        AccessibleTextDelegate?: () => string;
        AccessibleSummaryText?: string;
        AccessibleSummaryTextDelegate?: () => string;
        bIsVolatile?: boolean;
        bHiddenInDesigner?: boolean;
        bExpandedInDesigner?: boolean;
        bLockedInDesigner?: boolean;
        Cursor?: EMouseCursor;
        Clipping?: EWidgetClipping;
        Visibility?: ESlateVisibility;
        RenderOpacity?: number;
        FlowDirectionPreference?: EFlowDirectionPreference;
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

    type ESlateColorStylingMode = UE.ESlateColorStylingMode;
    interface SlateColor {
        SpecifiedColor?: LinearColor;
        ColorUseRule?: ESlateColorStylingMode;
    }

    interface NamedSlotBinding {
        Name?: string;
    }

    type EDesignPreviewSizeMode = UE.EDesignPreviewSizeMode;
    type EWidgetTickFrequency = UE.EWidgetTickFrequency;
    type EWidgetAnimationEvent = UE.EWidgetAnimationEvent;
    interface AnimationEventBinding {
        AnimationEvent?: EWidgetAnimationEvent;
        UserTag?: string;
    }

    interface UserWidgetProps extends WidgetProps {
        ColorAndOpacity?: LinearColor;
        ColorAndOpacityDelegate?: () => LinearColor;
        ForegroundColor?: SlateColor;
        ForegroundColorDelegate?: () => SlateColor;
        Padding?: Margin;
        NamedSlotBindings?: TArray<NamedSlotBinding>;
        DesignTimeSize?: Vector2D;
        DesignSizeMode?: EDesignPreviewSizeMode;
        PaletteCategory?: string;
        Priority?: number;
        bSupportsKeyboardFocus?: boolean;
        bIsFocusable?: boolean;
        bStopAction?: boolean;
        bHasScriptImplementedTick?: boolean;
        bHasScriptImplementedPaint?: boolean;
        bCookedWidgetTree?: boolean;
        TickFrequency?: EWidgetTickFrequency;
        AnimationCallbacks?: TArray<AnimationEventBinding>;
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
        Min?: Vector2D;
        Max?: Vector2D;
        bIsValid?: number;
    }

    type ESlateBrushDrawType = UE.ESlateBrushDrawType;
    type ESlateBrushTileType = UE.ESlateBrushTileType;
    type ESlateBrushMirrorType = UE.ESlateBrushMirrorType;
    type ESlateBrushImageType = UE.ESlateBrushImageType;
    interface SlateBrush {
        ImageSize?: Vector2D;
        Margin?: Margin;
        Tint?: LinearColor;
        TintColor?: SlateColor;
        ResourceName?: string;
        UVRegion?: Box2D;
        DrawAs?: ESlateBrushDrawType;
        Tiling?: ESlateBrushTileType;
        Mirroring?: ESlateBrushMirrorType;
        ImageType?: ESlateBrushImageType;
        bIsDynamicallyLoaded?: boolean;
        bHasUObject?: boolean;
    }

    interface BackgroundBlurProps extends ContentWidgetProps {
        Padding?: Margin;
        HorizontalAlignment?: EHorizontalAlignment;
        VerticalAlignment?: EVerticalAlignment;
        bApplyAlphaToBlur?: boolean;
        BlurStrength?: number;
        bOverrideAutoRadiusCalculation?: boolean;
        BlurRadius?: number;
        LowQualityFallbackBrush?: SlateBrush;
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
        HorizontalAlignment?: EHorizontalAlignment;
        VerticalAlignment?: EVerticalAlignment;
        bShowEffectWhenDisabled?: boolean;
        ContentColorAndOpacity?: LinearColor;
        ContentColorAndOpacityDelegate?: () => LinearColor;
        Padding?: Margin;
        Background?: SlateBrush;
        BackgroundDelegate?: () => SlateBrush;
        BrushColor?: LinearColor;
        BrushColorDelegate?: () => LinearColor;
        DesiredSizeScale?: Vector2D;
        bFlipForRightToLeftFlowDirection?: boolean;
        OnMouseButtonDownEvent?: (MyGeometry: Geometry, MouseEvent: PointerEvent) => EventReply;
        OnMouseButtonUpEvent?: (MyGeometry: Geometry, MouseEvent: PointerEvent) => EventReply;
        OnMouseMoveEvent?: (MyGeometry: Geometry, MouseEvent: PointerEvent) => EventReply;
        OnMouseDoubleClickEvent?: (MyGeometry: Geometry, MouseEvent: PointerEvent) => EventReply;
    }

    class Border extends React.Component<BorderProps> {
        nativePtr: UE.Border;
    }

    interface SlateWidgetStyle {
    }

    interface SlateSound {
    }

    interface ButtonStyle extends SlateWidgetStyle {
        Normal?: SlateBrush;
        Hovered?: SlateBrush;
        Pressed?: SlateBrush;
        Disabled?: SlateBrush;
        NormalPadding?: Margin;
        PressedPadding?: Margin;
        PressedSlateSound?: SlateSound;
        HoveredSlateSound?: SlateSound;
        PressedSound?: string;
        HoveredSound?: string;
    }

    type EButtonClickMethod = UE.EButtonClickMethod;
    type EButtonTouchMethod = UE.EButtonTouchMethod;
    type EButtonPressMethod = UE.EButtonPressMethod;
    interface ButtonProps extends ContentWidgetProps {
        WidgetStyle?: ButtonStyle;
        ColorAndOpacity?: LinearColor;
        BackgroundColor?: LinearColor;
        ClickMethod?: EButtonClickMethod;
        TouchMethod?: EButtonTouchMethod;
        PressMethod?: EButtonPressMethod;
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

    type ECheckBoxState = UE.ECheckBoxState;
    type ESlateCheckBoxType = UE.ESlateCheckBoxType;
    interface CheckBoxStyle extends SlateWidgetStyle {
        CheckBoxType?: ESlateCheckBoxType;
        UncheckedImage?: SlateBrush;
        UncheckedHoveredImage?: SlateBrush;
        UncheckedPressedImage?: SlateBrush;
        CheckedImage?: SlateBrush;
        CheckedHoveredImage?: SlateBrush;
        CheckedPressedImage?: SlateBrush;
        UndeterminedImage?: SlateBrush;
        UndeterminedHoveredImage?: SlateBrush;
        UndeterminedPressedImage?: SlateBrush;
        Padding?: Margin;
        ForegroundColor?: SlateColor;
        BorderBackgroundColor?: SlateColor;
        CheckedSlateSound?: SlateSound;
        UncheckedSlateSound?: SlateSound;
        HoveredSlateSound?: SlateSound;
        CheckedSound?: string;
        UncheckedSound?: string;
        HoveredSound?: string;
    }

    interface CheckBoxProps extends ContentWidgetProps {
        CheckedState?: ECheckBoxState;
        CheckedStateDelegate?: () => ECheckBoxState;
        WidgetStyle?: CheckBoxStyle;
        HorizontalAlignment?: EHorizontalAlignment;
        Padding?: Margin;
        BorderBackgroundColor?: SlateColor;
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
        Image?: SlateBrush;
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
        ButtonStyle?: ButtonStyle;
        DownArrowImage?: SlateBrush;
        MenuBorderBrush?: SlateBrush;
        MenuBorderPadding?: Margin;
    }

    interface ComboBoxStyle extends SlateWidgetStyle {
        ComboButtonStyle?: ComboButtonStyle;
        PressedSlateSound?: SlateSound;
        SelectionChangeSlateSound?: SlateSound;
        PressedSound?: string;
        SelectionChangeSound?: string;
    }

    interface TableRowStyle extends SlateWidgetStyle {
        SelectorFocusedBrush?: SlateBrush;
        ActiveHoveredBrush?: SlateBrush;
        ActiveBrush?: SlateBrush;
        InactiveHoveredBrush?: SlateBrush;
        InactiveBrush?: SlateBrush;
        EvenRowBackgroundHoveredBrush?: SlateBrush;
        EvenRowBackgroundBrush?: SlateBrush;
        OddRowBackgroundHoveredBrush?: SlateBrush;
        OddRowBackgroundBrush?: SlateBrush;
        TextColor?: SlateColor;
        SelectedTextColor?: SlateColor;
        DropIndicator_Above?: SlateBrush;
        DropIndicator_Onto?: SlateBrush;
        DropIndicator_Below?: SlateBrush;
        ActiveHighlightedBrush?: SlateBrush;
        InactiveHighlightedBrush?: SlateBrush;
    }

    interface FontOutlineSettings {
        OutlineSize?: number;
        bSeparateFillAlpha?: boolean;
        bApplyOutlineToDropShadows?: boolean;
        OutlineColor?: LinearColor;
    }

    type EFontHinting = UE.EFontHinting;
    interface SlateFontInfo {
        OutlineSettings?: FontOutlineSettings;
        TypefaceFontName?: string;
        Size?: number;
        FontName?: string;
        Hinting?: EFontHinting;
    }

    type ESelectInfo = UE.ESelectInfo;
    interface ComboBoxStringProps extends WidgetProps {
        DefaultOptions?: TArray<string>;
        SelectedOption?: string;
        WidgetStyle?: ComboBoxStyle;
        ItemStyle?: TableRowStyle;
        ContentPadding?: Margin;
        MaxListHeight?: number;
        HasDownArrow?: boolean;
        EnableGamepadNavigationMode?: boolean;
        Font?: SlateFontInfo;
        ForegroundColor?: SlateColor;
        bIsFocusable?: boolean;
        OnSelectionChanged?: (SelectedItem: string, SelectionType: ESelectInfo) => void;
        OnOpening?: () => void;
    }

    class ComboBoxString extends React.Component<ComboBoxStringProps> {
        nativePtr: UE.ComboBoxString;
    }

    type EDynamicBoxType = UE.EDynamicBoxType;
    interface UserWidgetPool {
    }

    interface DynamicEntryBoxBaseProps extends WidgetProps {
        EntryBoxType?: EDynamicBoxType;
        EntrySpacing?: Vector2D;
        SpacingPattern?: TArray<Vector2D>;
        EntrySizeRule?: SlateChildSize;
        EntryHorizontalAlignment?: EHorizontalAlignment;
        EntryVerticalAlignment?: EVerticalAlignment;
        MaxElementSize?: number;
        EntryWidgetPool?: UserWidgetPool;
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
        Font?: SlateFontInfo;
        ColorAndOpacity?: SlateColor;
        BackgroundImageSelected?: SlateBrush;
        BackgroundImageComposing?: SlateBrush;
        CaretImage?: SlateBrush;
    }

    type EVirtualKeyboardType = UE.EVirtualKeyboardType;
    interface VirtualKeyboardOptions {
        bEnableAutocorrect?: boolean;
    }

    type EVirtualKeyboardDismissAction = UE.EVirtualKeyboardDismissAction;
    type ETextJustify = UE.ETextJustify;
    type ETextShapingMethod = UE.ETextShapingMethod;
    type ETextFlowDirection = UE.ETextFlowDirection;
    interface ShapedTextOptions {
        bOverride_TextShapingMethod?: boolean;
        bOverride_TextFlowDirection?: boolean;
        TextShapingMethod?: ETextShapingMethod;
        TextFlowDirection?: ETextFlowDirection;
    }

    type ETextCommit = UE.ETextCommit;
    interface EditableTextProps extends WidgetProps {
        Text?: string;
        TextDelegate?: () => string;
        HintText?: string;
        HintTextDelegate?: () => string;
        WidgetStyle?: EditableTextStyle;
        Font?: SlateFontInfo;
        ColorAndOpacity?: SlateColor;
        IsReadOnly?: boolean;
        IsPassword?: boolean;
        MinimumDesiredWidth?: number;
        IsCaretMovedWhenGainFocus?: boolean;
        SelectAllTextWhenFocused?: boolean;
        RevertTextOnEscape?: boolean;
        ClearKeyboardFocusOnCommit?: boolean;
        SelectAllTextOnCommit?: boolean;
        AllowContextMenu?: boolean;
        KeyboardType?: EVirtualKeyboardType;
        VirtualKeyboardOptions?: VirtualKeyboardOptions;
        VirtualKeyboardDismissAction?: EVirtualKeyboardDismissAction;
        Justification?: ETextJustify;
        ShapedTextOptions?: ShapedTextOptions;
        OnTextChanged?: (Text: string) => void;
        OnTextCommitted?: (Text: string, CommitMethod: ETextCommit) => void;
    }

    class EditableText extends React.Component<EditableTextProps> {
        nativePtr: UE.EditableText;
    }

    interface ScrollBarStyle extends SlateWidgetStyle {
        HorizontalBackgroundImage?: SlateBrush;
        VerticalBackgroundImage?: SlateBrush;
        VerticalTopSlotImage?: SlateBrush;
        HorizontalTopSlotImage?: SlateBrush;
        VerticalBottomSlotImage?: SlateBrush;
        HorizontalBottomSlotImage?: SlateBrush;
        NormalThumbImage?: SlateBrush;
        HoveredThumbImage?: SlateBrush;
        DraggedThumbImage?: SlateBrush;
    }

    interface EditableTextBoxStyle extends SlateWidgetStyle {
        BackgroundImageNormal?: SlateBrush;
        BackgroundImageHovered?: SlateBrush;
        BackgroundImageFocused?: SlateBrush;
        BackgroundImageReadOnly?: SlateBrush;
        Padding?: Margin;
        Font?: SlateFontInfo;
        ForegroundColor?: SlateColor;
        BackgroundColor?: SlateColor;
        ReadOnlyForegroundColor?: SlateColor;
        HScrollBarPadding?: Margin;
        VScrollBarPadding?: Margin;
        ScrollBarStyle?: ScrollBarStyle;
    }

    interface EditableTextBoxProps extends WidgetProps {
        Text?: string;
        TextDelegate?: () => string;
        WidgetStyle?: EditableTextBoxStyle;
        HintText?: string;
        HintTextDelegate?: () => string;
        Font?: SlateFontInfo;
        ForegroundColor?: LinearColor;
        BackgroundColor?: LinearColor;
        ReadOnlyForegroundColor?: LinearColor;
        IsReadOnly?: boolean;
        IsPassword?: boolean;
        MinimumDesiredWidth?: number;
        Padding?: Margin;
        IsCaretMovedWhenGainFocus?: boolean;
        SelectAllTextWhenFocused?: boolean;
        RevertTextOnEscape?: boolean;
        ClearKeyboardFocusOnCommit?: boolean;
        SelectAllTextOnCommit?: boolean;
        AllowContextMenu?: boolean;
        KeyboardType?: EVirtualKeyboardType;
        VirtualKeyboardOptions?: VirtualKeyboardOptions;
        VirtualKeyboardDismissAction?: EVirtualKeyboardDismissAction;
        Justification?: ETextJustify;
        ShapedTextOptions?: ShapedTextOptions;
        OnTextChanged?: (Text: string) => void;
        OnTextCommitted?: (Text: string, CommitMethod: ETextCommit) => void;
    }

    class EditableTextBox extends React.Component<EditableTextBoxProps> {
        nativePtr: UE.EditableTextBox;
    }

    interface ExpandableAreaStyle extends SlateWidgetStyle {
        CollapsedImage?: SlateBrush;
        ExpandedImage?: SlateBrush;
        RolloutAnimationSeconds?: number;
    }

    interface ExpandableAreaProps extends WidgetProps {
        Style?: ExpandableAreaStyle;
        BorderBrush?: SlateBrush;
        BorderColor?: SlateColor;
        bIsExpanded?: boolean;
        MaxHeight?: number;
        HeaderPadding?: Margin;
        AreaPadding?: Margin;
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
        Brush?: SlateBrush;
        BrushDelegate?: () => SlateBrush;
        ColorAndOpacity?: LinearColor;
        ColorAndOpacityDelegate?: () => LinearColor;
        bFlipForRightToLeftFlowDirection?: boolean;
        OnMouseButtonDownEvent?: (MyGeometry: Geometry, MouseEvent: PointerEvent) => EventReply;
    }

    class Image extends React.Component<ImageProps> {
        nativePtr: UE.Image;
    }

    interface TextBlockStyle extends SlateWidgetStyle {
        Font?: SlateFontInfo;
        ColorAndOpacity?: SlateColor;
        ShadowOffset?: Vector2D;
        ShadowColorAndOpacity?: LinearColor;
        SelectedBackgroundColor?: SlateColor;
        HighlightColor?: LinearColor;
        HighlightShape?: SlateBrush;
        StrikeBrush?: SlateBrush;
        UnderlineBrush?: SlateBrush;
    }

    interface Key {
        KeyName?: string;
    }

    interface InputChord {
        Key?: Key;
        bShift?: boolean;
        bCtrl?: boolean;
        bAlt?: boolean;
        bCmd?: boolean;
    }

    interface InputKeySelectorProps extends WidgetProps {
        WidgetStyle?: ButtonStyle;
        TextStyle?: TextBlockStyle;
        SelectedKey?: InputChord;
        Font?: SlateFontInfo;
        Margin?: Margin;
        ColorAndOpacity?: LinearColor;
        KeySelectionText?: string;
        NoKeySpecifiedText?: string;
        bAllowModifierKeys?: boolean;
        bAllowGamepadKeys?: boolean;
        EscapeKeys?: TArray<Key>;
        OnKeySelected?: (SelectedKey: InputChord) => void;
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
        EntryWidgetPool?: UserWidgetPool;
    }

    class ListViewBase extends React.Component<ListViewBaseProps> {
        nativePtr: UE.ListViewBase;
    }

    type EOrientation = UE.EOrientation;
    type ESelectionMode = UE.ESelectionMode;
    type EConsumeMouseWheel = UE.EConsumeMouseWheel;
    interface ListViewProps extends ListViewBaseProps {
        Orientation?: EOrientation;
        SelectionMode?: ESelectionMode;
        ConsumeMouseWheel?: EConsumeMouseWheel;
        bClearSelectionOnClick?: boolean;
        bIsFocusable?: boolean;
        EntrySpacing?: number;
        bReturnFocusToSelection?: boolean;
    }

    class ListView extends React.Component<ListViewProps> {
        nativePtr: UE.ListView;
    }

    type EMenuPlacement = UE.EMenuPlacement;
    interface MenuAnchorProps extends ContentWidgetProps {
        Placement?: EMenuPlacement;
        bFitInWindow?: boolean;
        ShouldDeferPaintingAfterWindowContent?: boolean;
        UseApplicationMenuStack?: boolean;
        OnMenuOpenChanged?: (bIsOpen: boolean) => void;
    }

    class MenuAnchor extends React.Component<MenuAnchorProps> {
        nativePtr: UE.MenuAnchor;
    }

    type ETextWrappingPolicy = UE.ETextWrappingPolicy;
    interface TextLayoutWidgetProps extends WidgetProps {
        ShapedTextOptions?: ShapedTextOptions;
        Justification?: ETextJustify;
        WrappingPolicy?: ETextWrappingPolicy;
        AutoWrapText?: boolean;
        WrapTextAt?: number;
        Margin?: Margin;
        LineHeightPercentage?: number;
    }

    class TextLayoutWidget extends React.Component<TextLayoutWidgetProps> {
        nativePtr: UE.TextLayoutWidget;
    }

    interface MultiLineEditableTextProps extends TextLayoutWidgetProps {
        Text?: string;
        HintText?: string;
        HintTextDelegate?: () => string;
        WidgetStyle?: TextBlockStyle;
        bIsReadOnly?: boolean;
        Font?: SlateFontInfo;
        SelectAllTextWhenFocused?: boolean;
        ClearTextSelectionOnFocusLoss?: boolean;
        RevertTextOnEscape?: boolean;
        ClearKeyboardFocusOnCommit?: boolean;
        AllowContextMenu?: boolean;
        VirtualKeyboardOptions?: VirtualKeyboardOptions;
        VirtualKeyboardDismissAction?: EVirtualKeyboardDismissAction;
        OnTextChanged?: (Text: string) => void;
        OnTextCommitted?: (Text: string, CommitMethod: ETextCommit) => void;
    }

    class MultiLineEditableText extends React.Component<MultiLineEditableTextProps> {
        nativePtr: UE.MultiLineEditableText;
    }

    interface MultiLineEditableTextBoxProps extends TextLayoutWidgetProps {
        Text?: string;
        HintText?: string;
        HintTextDelegate?: () => string;
        WidgetStyle?: EditableTextBoxStyle;
        TextStyle?: TextBlockStyle;
        bIsReadOnly?: boolean;
        AllowContextMenu?: boolean;
        VirtualKeyboardOptions?: VirtualKeyboardOptions;
        VirtualKeyboardDismissAction?: EVirtualKeyboardDismissAction;
        Font?: SlateFontInfo;
        ForegroundColor?: LinearColor;
        BackgroundColor?: LinearColor;
        ReadOnlyForegroundColor?: LinearColor;
        OnTextChanged?: (Text: string) => void;
        OnTextCommitted?: (Text: string, CommitMethod: ETextCommit) => void;
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
        BackgroundImage?: SlateBrush;
        FillImage?: SlateBrush;
        MarqueeImage?: SlateBrush;
    }

    type EProgressBarFillType = UE.EProgressBarFillType;
    interface ProgressBarProps extends WidgetProps {
        WidgetStyle?: ProgressBarStyle;
        Percent?: number;
        BarFillType?: EProgressBarFillType;
        bIsMarquee?: boolean;
        BorderPadding?: Vector2D;
        PercentDelegate?: () => number;
        FillColorAndOpacity?: LinearColor;
        FillColorAndOpacityDelegate?: () => LinearColor;
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
        DefaultTextStyleOverride?: TextBlockStyle;
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

    type EStretch = UE.EStretch;
    type EStretchDirection = UE.EStretchDirection;
    interface ScaleBoxProps extends ContentWidgetProps {
        Stretch?: EStretch;
        StretchDirection?: EStretchDirection;
        UserSpecifiedScale?: number;
        IgnoreInheritedScale?: boolean;
    }

    class ScaleBox extends React.Component<ScaleBoxProps> {
        nativePtr: UE.ScaleBox;
    }

    interface ScrollBarProps extends WidgetProps {
        WidgetStyle?: ScrollBarStyle;
        bAlwaysShowScrollbar?: boolean;
        bAlwaysShowScrollbarTrack?: boolean;
        Orientation?: EOrientation;
        Thickness?: Vector2D;
        Padding?: Margin;
    }

    class ScrollBar extends React.Component<ScrollBarProps> {
        nativePtr: UE.ScrollBar;
    }

    interface ScrollBoxStyle extends SlateWidgetStyle {
        TopShadowBrush?: SlateBrush;
        BottomShadowBrush?: SlateBrush;
        LeftShadowBrush?: SlateBrush;
        RightShadowBrush?: SlateBrush;
    }

    type EDescendantScrollDestination = UE.EDescendantScrollDestination;
    interface ScrollBoxProps extends PanelWidgetProps {
        WidgetStyle?: ScrollBoxStyle;
        WidgetBarStyle?: ScrollBarStyle;
        Orientation?: EOrientation;
        ScrollBarVisibility?: ESlateVisibility;
        ConsumeMouseWheel?: EConsumeMouseWheel;
        ScrollbarThickness?: Vector2D;
        ScrollbarPadding?: Margin;
        AlwaysShowScrollbar?: boolean;
        AlwaysShowScrollbarTrack?: boolean;
        AllowOverscroll?: boolean;
        bAnimateWheelScrolling?: boolean;
        NavigationDestination?: EDescendantScrollDestination;
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
        NormalBarImage?: SlateBrush;
        HoveredBarImage?: SlateBrush;
        DisabledBarImage?: SlateBrush;
        NormalThumbImage?: SlateBrush;
        HoveredThumbImage?: SlateBrush;
        DisabledThumbImage?: SlateBrush;
        BarThickness?: number;
    }

    interface SliderProps extends WidgetProps {
        Value?: number;
        ValueDelegate?: () => number;
        MinValue?: number;
        MaxValue?: number;
        WidgetStyle?: SliderStyle;
        Orientation?: EOrientation;
        SliderBarColor?: LinearColor;
        SliderHandleColor?: LinearColor;
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
        Size?: Vector2D;
    }

    class Spacer extends React.Component<SpacerProps> {
        nativePtr: UE.Spacer;
    }

    interface SpinBoxStyle extends SlateWidgetStyle {
        BackgroundBrush?: SlateBrush;
        HoveredBackgroundBrush?: SlateBrush;
        ActiveFillBrush?: SlateBrush;
        InactiveFillBrush?: SlateBrush;
        ArrowsImage?: SlateBrush;
        ForegroundColor?: SlateColor;
        TextPadding?: Margin;
    }

    interface SpinBoxProps extends WidgetProps {
        Value?: number;
        ValueDelegate?: () => number;
        WidgetStyle?: SpinBoxStyle;
        Delta?: number;
        SliderExponent?: number;
        Font?: SlateFontInfo;
        Justification?: ETextJustify;
        MinDesiredWidth?: number;
        ClearKeyboardFocusOnCommit?: boolean;
        SelectAllTextOnCommit?: boolean;
        ForegroundColor?: SlateColor;
        OnValueChanged?: (InValue: number) => void;
        OnValueCommitted?: (InValue: number, CommitMethod: ETextCommit) => void;
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
        ColorAndOpacity?: SlateColor;
        ColorAndOpacityDelegate?: () => SlateColor;
        Font?: SlateFontInfo;
        StrikeBrush?: SlateBrush;
        ShadowOffset?: Vector2D;
        ShadowColorAndOpacity?: LinearColor;
        ShadowColorAndOpacityDelegate?: () => LinearColor;
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
        Image?: SlateBrush;
    }

    class Throbber extends React.Component<ThrobberProps> {
        nativePtr: UE.Throbber;
    }

    type EListItemAlignment = UE.EListItemAlignment;
    interface TileViewProps extends ListViewProps {
        EntryHeight?: number;
        EntryWidth?: number;
        TileAlignment?: EListItemAlignment;
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
        SlotPadding?: Margin;
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
        BackgroundColor?: LinearColor;
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
        InnerSlotPadding?: Vector2D;
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
        FrameNumber?: FrameNumber;
        SubFrame?: number;
    }

    interface FrameRate {
        Numerator?: number;
        Denominator?: number;
    }

    interface QualifiedFrameTime {
        Time?: FrameTime;
        Rate?: FrameRate;
    }

    interface LevelSequenceSnapshotSettings {
        ZeroPadAmount?: number;
        FrameRate?: FrameRate;
    }

    interface MovieSceneSequenceID {
        Value?: number;
    }

    interface LevelSequencePlayerSnapshot {
        MasterName?: string;
        MasterTime?: QualifiedFrameTime;
        SourceTime?: QualifiedFrameTime;
        CurrentShotName?: string;
        CurrentShotLocalTime?: QualifiedFrameTime;
        CurrentShotSourceTime?: QualifiedFrameTime;
        SourceTimecode?: string;
        Settings?: LevelSequenceSnapshotSettings;
        ShotID?: MovieSceneSequenceID;
    }

    interface LevelSequenceBurnInProps extends UserWidgetProps {
        FrameInformation?: LevelSequencePlayerSnapshot;
    }

    class LevelSequenceBurnIn extends React.Component<LevelSequenceBurnInProps> {
        nativePtr: UE.LevelSequenceBurnIn;
    }

    interface SoftObjectPath {
        AssetPathName?: string;
        SubPathString?: string;
    }

    interface PropertyViewBaseProps extends WidgetProps {
        SoftObjectPath?: SoftObjectPath;
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
    