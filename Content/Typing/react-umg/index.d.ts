import * as React from 'react';
import {TArray}  from 'ue';

export interface PanelSlot {
}

export interface Margin {
    Left?: number;
    Top?: number;
    Right?: number;
    Bottom?: number;
}

export interface BackgroundBlurSlot extends PanelSlot {
    Padding?: Margin;
    HorizontalAlignment?: number;
    VerticalAlignment?: number;
}

export interface BorderSlot extends PanelSlot {
    Padding?: Margin;
    HorizontalAlignment?: number;
    VerticalAlignment?: number;
}

export interface ButtonSlot extends PanelSlot {
    Padding?: Margin;
    HorizontalAlignment?: number;
    VerticalAlignment?: number;
}

export interface Vector2D {
    X?: number;
    Y?: number;
}

export interface Anchors {
    Minimum?: Vector2D;
    Maximum?: Vector2D;
}

export interface AnchorData {
    Offsets?: Margin;
    Anchors?: Anchors;
    Alignment?: Vector2D;
}

export interface CanvasPanelSlot extends PanelSlot {
    LayoutData?: AnchorData;
    bAutoSize?: boolean;
    ZOrder?: number;
}

export interface GridSlot extends PanelSlot {
    Padding?: Margin;
    HorizontalAlignment?: number;
    VerticalAlignment?: number;
    Row?: number;
    RowSpan?: number;
    Column?: number;
    ColumnSpan?: number;
    Layer?: number;
    Nudge?: Vector2D;
}

export interface SlateChildSize {
    Value?: number;
    SizeRule?: number;
}

export interface HorizontalBoxSlot extends PanelSlot {
    Padding?: Margin;
    Size?: SlateChildSize;
    HorizontalAlignment?: number;
    VerticalAlignment?: number;
}

export interface OverlaySlot extends PanelSlot {
    Padding?: Margin;
    HorizontalAlignment?: number;
    VerticalAlignment?: number;
}

export interface SafeZoneSlot extends PanelSlot {
    bIsTitleSafe?: boolean;
    SafeAreaScale?: Margin;
    HAlign?: number;
    VAlign?: number;
    Padding?: Margin;
}

export interface ScaleBoxSlot extends PanelSlot {
    Padding?: Margin;
    HorizontalAlignment?: number;
    VerticalAlignment?: number;
}

export interface ScrollBoxSlot extends PanelSlot {
    Padding?: Margin;
    HorizontalAlignment?: number;
    VerticalAlignment?: number;
}

export interface SizeBoxSlot extends PanelSlot {
    Padding?: Margin;
    HorizontalAlignment?: number;
    VerticalAlignment?: number;
}

export interface UniformGridSlot extends PanelSlot {
    HorizontalAlignment?: number;
    VerticalAlignment?: number;
    Row?: number;
    Column?: number;
}

export interface VerticalBoxSlot extends PanelSlot {
    Size?: SlateChildSize;
    Padding?: Margin;
    HorizontalAlignment?: number;
    VerticalAlignment?: number;
}

export interface WidgetSwitcherSlot extends PanelSlot {
    Padding?: Margin;
    HorizontalAlignment?: number;
    VerticalAlignment?: number;
}

export interface WindowTitleBarAreaSlot extends PanelSlot {
    Padding?: Margin;
    HorizontalAlignment?: number;
    VerticalAlignment?: number;
}

export interface WrapBoxSlot extends PanelSlot {
    Padding?: Margin;
    bFillEmptySpace?: boolean;
    FillSpanWhenLessThan?: number;
    HorizontalAlignment?: number;
    VerticalAlignment?: number;
}

export interface Props {
    Slot ? : PanelSlot;
}

export type ESlateVisibility = "Visible" | "Collapsed" | "Hidden" | "HitTestInvisible" | "SelfHitTestInvisible" | "ESlateVisibility_MAX";
export const ESlateVisibility: {Visible: "Visible" ,Collapsed: "Collapsed" ,Hidden: "Hidden" ,HitTestInvisible: "HitTestInvisible" ,SelfHitTestInvisible: "SelfHitTestInvisible" ,ESlateVisibility_MAX: "ESlateVisibility_MAX"};
export interface WidgetTransform {
    Translation?: Vector2D;
    Scale?: Vector2D;
    Shear?: Vector2D;
    Angle?: number;
}

export type ESlateAccessibleBehavior = "NotAccessible" | "Auto" | "Summary" | "Custom" | "ToolTip" | "ESlateAccessibleBehavior_MAX";
export const ESlateAccessibleBehavior: {NotAccessible: "NotAccessible" ,Auto: "Auto" ,Summary: "Summary" ,Custom: "Custom" ,ToolTip: "ToolTip" ,ESlateAccessibleBehavior_MAX: "ESlateAccessibleBehavior_MAX"};
export type EWidgetClipping = "Inherit" | "ClipToBounds" | "ClipToBoundsWithoutIntersecting" | "ClipToBoundsAlways" | "OnDemand" | "EWidgetClipping_MAX";
export const EWidgetClipping: {Inherit: "Inherit" ,ClipToBounds: "ClipToBounds" ,ClipToBoundsWithoutIntersecting: "ClipToBoundsWithoutIntersecting" ,ClipToBoundsAlways: "ClipToBoundsAlways" ,OnDemand: "OnDemand" ,EWidgetClipping_MAX: "EWidgetClipping_MAX"};
export type EFlowDirectionPreference = "Inherit" | "Culture" | "LeftToRight" | "RightToLeft" | "EFlowDirectionPreference_MAX";
export const EFlowDirectionPreference: {Inherit: "Inherit" ,Culture: "Culture" ,LeftToRight: "LeftToRight" ,RightToLeft: "RightToLeft" ,EFlowDirectionPreference_MAX: "EFlowDirectionPreference_MAX"};
export interface WidgetProps extends Props {
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
    Cursor?: number;
    Clipping?: EWidgetClipping;
    Visibility?: ESlateVisibility;
    RenderOpacity?: number;
    FlowDirectionPreference?: EFlowDirectionPreference;
    DesignerFlags?: number;
    DisplayLabel?: string;
    CategoryName?: string;
}

export class Widget extends React.Component<WidgetProps> {}

export interface LinearColor {
    R?: number;
    G?: number;
    B?: number;
    A?: number;
}

export interface SlateColor {
    SpecifiedColor?: LinearColor;
    ColorUseRule?: number;
}

export interface NamedSlotBinding {
    Name?: string;
}

export type EDesignPreviewSizeMode = "FillScreen" | "Custom" | "CustomOnScreen" | "Desired" | "DesiredOnScreen" | "EDesignPreviewSizeMode_MAX";
export const EDesignPreviewSizeMode: {FillScreen: "FillScreen" ,Custom: "Custom" ,CustomOnScreen: "CustomOnScreen" ,Desired: "Desired" ,DesiredOnScreen: "DesiredOnScreen" ,EDesignPreviewSizeMode_MAX: "EDesignPreviewSizeMode_MAX"};
export type EWidgetTickFrequency = "Never" | "Auto" | "EWidgetTickFrequency_MAX";
export const EWidgetTickFrequency: {Never: "Never" ,Auto: "Auto" ,EWidgetTickFrequency_MAX: "EWidgetTickFrequency_MAX"};
export type EWidgetAnimationEvent = "Started" | "Finished" | "EWidgetAnimationEvent_MAX";
export const EWidgetAnimationEvent: {Started: "Started" ,Finished: "Finished" ,EWidgetAnimationEvent_MAX: "EWidgetAnimationEvent_MAX"};
export interface AnimationEventBinding {
    AnimationEvent?: EWidgetAnimationEvent;
    UserTag?: string;
}

export interface UserWidgetProps extends WidgetProps {
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

export class UserWidget extends React.Component<UserWidgetProps> {}

export interface VREditorBaseUserWidgetProps extends UserWidgetProps {
}

export class VREditorBaseUserWidget extends React.Component<VREditorBaseUserWidgetProps> {}

export interface PanelWidgetProps extends WidgetProps {
}

export class PanelWidget extends React.Component<PanelWidgetProps> {}

export interface ContentWidgetProps extends PanelWidgetProps {
}

export class ContentWidget extends React.Component<ContentWidgetProps> {}

export interface Box2D {
    Min?: Vector2D;
    Max?: Vector2D;
    bIsValid?: number;
}

export interface SlateBrush {
    ImageSize?: Vector2D;
    Margin?: Margin;
    Tint?: LinearColor;
    TintColor?: SlateColor;
    ResourceName?: string;
    UVRegion?: Box2D;
    DrawAs?: number;
    Tiling?: number;
    Mirroring?: number;
    ImageType?: number;
    bIsDynamicallyLoaded?: boolean;
    bHasUObject?: boolean;
}

export interface BackgroundBlurProps extends ContentWidgetProps {
    Padding?: Margin;
    HorizontalAlignment?: number;
    VerticalAlignment?: number;
    bApplyAlphaToBlur?: boolean;
    BlurStrength?: number;
    bOverrideAutoRadiusCalculation?: boolean;
    BlurRadius?: number;
    LowQualityFallbackBrush?: SlateBrush;
}

export class BackgroundBlur extends React.Component<BackgroundBlurProps> {}

export interface Geometry {
}

export interface InputEvent {
}

export interface PointerEvent extends InputEvent {
}

export interface EventReply {
}

export interface BorderProps extends ContentWidgetProps {
    HorizontalAlignment?: number;
    VerticalAlignment?: number;
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

export class Border extends React.Component<BorderProps> {}

export interface SlateWidgetStyle {
}

export interface SlateSound {
}

export interface ButtonStyle extends SlateWidgetStyle {
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

export interface ButtonProps extends ContentWidgetProps {
    WidgetStyle?: ButtonStyle;
    ColorAndOpacity?: LinearColor;
    BackgroundColor?: LinearColor;
    ClickMethod?: number;
    TouchMethod?: number;
    PressMethod?: number;
    IsFocusable?: boolean;
    OnClicked?: () => void;
    OnPressed?: () => void;
    OnReleased?: () => void;
    OnHovered?: () => void;
    OnUnhovered?: () => void;
}

export class Button extends React.Component<ButtonProps> {}

export interface CanvasPanelProps extends PanelWidgetProps {
}

export class CanvasPanel extends React.Component<CanvasPanelProps> {}

export type ECheckBoxState = "Unchecked" | "Checked" | "Undetermined" | "ECheckBoxState_MAX";
export const ECheckBoxState: {Unchecked: "Unchecked" ,Checked: "Checked" ,Undetermined: "Undetermined" ,ECheckBoxState_MAX: "ECheckBoxState_MAX"};
export interface CheckBoxStyle extends SlateWidgetStyle {
    CheckBoxType?: number;
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

export interface CheckBoxProps extends ContentWidgetProps {
    CheckedState?: ECheckBoxState;
    CheckedStateDelegate?: () => ECheckBoxState;
    WidgetStyle?: CheckBoxStyle;
    HorizontalAlignment?: number;
    Padding?: Margin;
    BorderBackgroundColor?: SlateColor;
    IsFocusable?: boolean;
    OnCheckStateChanged?: (bIsChecked: boolean) => void;
}

export class CheckBox extends React.Component<CheckBoxProps> {}

export interface CircularThrobberProps extends WidgetProps {
    NumberOfPieces?: number;
    Period?: number;
    Radius?: number;
    Image?: SlateBrush;
    bEnableRadius?: boolean;
}

export class CircularThrobber extends React.Component<CircularThrobberProps> {}

export interface ComboBoxProps extends WidgetProps {
    bIsFocusable?: boolean;
}

export class ComboBox extends React.Component<ComboBoxProps> {}

export interface ComboButtonStyle extends SlateWidgetStyle {
    ButtonStyle?: ButtonStyle;
    DownArrowImage?: SlateBrush;
    MenuBorderBrush?: SlateBrush;
    MenuBorderPadding?: Margin;
}

export interface ComboBoxStyle extends SlateWidgetStyle {
    ComboButtonStyle?: ComboButtonStyle;
    PressedSlateSound?: SlateSound;
    SelectionChangeSlateSound?: SlateSound;
    PressedSound?: string;
    SelectionChangeSound?: string;
}

export interface TableRowStyle extends SlateWidgetStyle {
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

export interface FontOutlineSettings {
    OutlineSize?: number;
    bSeparateFillAlpha?: boolean;
    bApplyOutlineToDropShadows?: boolean;
    OutlineColor?: LinearColor;
}

export type EFontHinting = "Default" | "Auto" | "AutoLight" | "Monochrome" | "None" | "EFontHinting_MAX";
export const EFontHinting: {Default: "Default" ,Auto: "Auto" ,AutoLight: "AutoLight" ,Monochrome: "Monochrome" ,None: "None" ,EFontHinting_MAX: "EFontHinting_MAX"};
export interface SlateFontInfo {
    OutlineSettings?: FontOutlineSettings;
    TypefaceFontName?: string;
    Size?: number;
    FontName?: string;
    Hinting?: EFontHinting;
}

export interface ComboBoxStringProps extends WidgetProps {
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
    OnSelectionChanged?: (SelectedItem: string, SelectionType: number) => void;
    OnOpening?: () => void;
}

export class ComboBoxString extends React.Component<ComboBoxStringProps> {}

export type EDynamicBoxType = "Horizontal" | "Vertical" | "Wrap" | "Overlay" | "EDynamicBoxType_MAX";
export const EDynamicBoxType: {Horizontal: "Horizontal" ,Vertical: "Vertical" ,Wrap: "Wrap" ,Overlay: "Overlay" ,EDynamicBoxType_MAX: "EDynamicBoxType_MAX"};
export interface UserWidgetPool {
}

export interface DynamicEntryBoxBaseProps extends WidgetProps {
    EntryBoxType?: EDynamicBoxType;
    EntrySpacing?: Vector2D;
    SpacingPattern?: TArray<Vector2D>;
    EntrySizeRule?: SlateChildSize;
    EntryHorizontalAlignment?: number;
    EntryVerticalAlignment?: number;
    MaxElementSize?: number;
    EntryWidgetPool?: UserWidgetPool;
}

export class DynamicEntryBoxBase extends React.Component<DynamicEntryBoxBaseProps> {}

export interface DynamicEntryBoxProps extends DynamicEntryBoxBaseProps {
    NumDesignerPreviewEntries?: number;
}

export class DynamicEntryBox extends React.Component<DynamicEntryBoxProps> {}

export interface EditableTextStyle extends SlateWidgetStyle {
    Font?: SlateFontInfo;
    ColorAndOpacity?: SlateColor;
    BackgroundImageSelected?: SlateBrush;
    BackgroundImageComposing?: SlateBrush;
    CaretImage?: SlateBrush;
}

export interface VirtualKeyboardOptions {
    bEnableAutocorrect?: boolean;
}

export type EVirtualKeyboardDismissAction = "TextChangeOnDismiss" | "TextCommitOnAccept" | "TextCommitOnDismiss" | "EVirtualKeyboardDismissAction_MAX";
export const EVirtualKeyboardDismissAction: {TextChangeOnDismiss: "TextChangeOnDismiss" ,TextCommitOnAccept: "TextCommitOnAccept" ,TextCommitOnDismiss: "TextCommitOnDismiss" ,EVirtualKeyboardDismissAction_MAX: "EVirtualKeyboardDismissAction_MAX"};
export type ETextShapingMethod = "Auto" | "KerningOnly" | "FullShaping" | "ETextShapingMethod_MAX";
export const ETextShapingMethod: {Auto: "Auto" ,KerningOnly: "KerningOnly" ,FullShaping: "FullShaping" ,ETextShapingMethod_MAX: "ETextShapingMethod_MAX"};
export type ETextFlowDirection = "Auto" | "LeftToRight" | "RightToLeft" | "ETextFlowDirection_MAX";
export const ETextFlowDirection: {Auto: "Auto" ,LeftToRight: "LeftToRight" ,RightToLeft: "RightToLeft" ,ETextFlowDirection_MAX: "ETextFlowDirection_MAX"};
export interface ShapedTextOptions {
    bOverride_TextShapingMethod?: boolean;
    bOverride_TextFlowDirection?: boolean;
    TextShapingMethod?: ETextShapingMethod;
    TextFlowDirection?: ETextFlowDirection;
}

export interface EditableTextProps extends WidgetProps {
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
    KeyboardType?: number;
    VirtualKeyboardOptions?: VirtualKeyboardOptions;
    VirtualKeyboardDismissAction?: EVirtualKeyboardDismissAction;
    Justification?: number;
    ShapedTextOptions?: ShapedTextOptions;
    OnTextChanged?: (Text: string) => void;
    OnTextCommitted?: (Text: string, CommitMethod: number) => void;
}

export class EditableText extends React.Component<EditableTextProps> {}

export interface ScrollBarStyle extends SlateWidgetStyle {
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

export interface EditableTextBoxStyle extends SlateWidgetStyle {
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

export interface EditableTextBoxProps extends WidgetProps {
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
    KeyboardType?: number;
    VirtualKeyboardOptions?: VirtualKeyboardOptions;
    VirtualKeyboardDismissAction?: EVirtualKeyboardDismissAction;
    Justification?: number;
    ShapedTextOptions?: ShapedTextOptions;
    OnTextChanged?: (Text: string) => void;
    OnTextCommitted?: (Text: string, CommitMethod: number) => void;
}

export class EditableTextBox extends React.Component<EditableTextBoxProps> {}

export interface ExpandableAreaStyle extends SlateWidgetStyle {
    CollapsedImage?: SlateBrush;
    ExpandedImage?: SlateBrush;
    RolloutAnimationSeconds?: number;
}

export interface ExpandableAreaProps extends WidgetProps {
    Style?: ExpandableAreaStyle;
    BorderBrush?: SlateBrush;
    BorderColor?: SlateColor;
    bIsExpanded?: boolean;
    MaxHeight?: number;
    HeaderPadding?: Margin;
    AreaPadding?: Margin;
}

export class ExpandableArea extends React.Component<ExpandableAreaProps> {}

export interface GridPanelProps extends PanelWidgetProps {
    ColumnFill?: TArray<number>;
    RowFill?: TArray<number>;
}

export class GridPanel extends React.Component<GridPanelProps> {}

export interface HorizontalBoxProps extends PanelWidgetProps {
}

export class HorizontalBox extends React.Component<HorizontalBoxProps> {}

export interface ImageProps extends WidgetProps {
    Brush?: SlateBrush;
    BrushDelegate?: () => SlateBrush;
    ColorAndOpacity?: LinearColor;
    ColorAndOpacityDelegate?: () => LinearColor;
    bFlipForRightToLeftFlowDirection?: boolean;
    OnMouseButtonDownEvent?: (MyGeometry: Geometry, MouseEvent: PointerEvent) => EventReply;
}

export class Image extends React.Component<ImageProps> {}

export interface TextBlockStyle extends SlateWidgetStyle {
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

export interface Key {
    KeyName?: string;
}

export interface InputChord {
    Key?: Key;
    bShift?: boolean;
    bCtrl?: boolean;
    bAlt?: boolean;
    bCmd?: boolean;
}

export interface InputKeySelectorProps extends WidgetProps {
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

export class InputKeySelector extends React.Component<InputKeySelectorProps> {}

export interface InvalidationBoxProps extends ContentWidgetProps {
    bCanCache?: boolean;
    CacheRelativeTransforms?: boolean;
}

export class InvalidationBox extends React.Component<InvalidationBoxProps> {}

export interface ListViewBaseProps extends WidgetProps {
    WheelScrollMultiplier?: number;
    bEnableScrollAnimation?: boolean;
    bEnableFixedLineOffset?: boolean;
    FixedLineScrollOffset?: number;
    NumDesignerPreviewEntries?: number;
    EntryWidgetPool?: UserWidgetPool;
}

export class ListViewBase extends React.Component<ListViewBaseProps> {}

export type EConsumeMouseWheel = "WhenScrollingPossible" | "Always" | "Never" | "EConsumeMouseWheel_MAX";
export const EConsumeMouseWheel: {WhenScrollingPossible: "WhenScrollingPossible" ,Always: "Always" ,Never: "Never" ,EConsumeMouseWheel_MAX: "EConsumeMouseWheel_MAX"};
export interface ListViewProps extends ListViewBaseProps {
    Orientation?: number;
    SelectionMode?: number;
    ConsumeMouseWheel?: EConsumeMouseWheel;
    bClearSelectionOnClick?: boolean;
    bIsFocusable?: boolean;
    EntrySpacing?: number;
    bReturnFocusToSelection?: boolean;
}

export class ListView extends React.Component<ListViewProps> {}

export interface MenuAnchorProps extends ContentWidgetProps {
    Placement?: number;
    bFitInWindow?: boolean;
    ShouldDeferPaintingAfterWindowContent?: boolean;
    UseApplicationMenuStack?: boolean;
    OnMenuOpenChanged?: (bIsOpen: boolean) => void;
}

export class MenuAnchor extends React.Component<MenuAnchorProps> {}

export type ETextWrappingPolicy = "DefaultWrapping" | "AllowPerCharacterWrapping" | "ETextWrappingPolicy_MAX";
export const ETextWrappingPolicy: {DefaultWrapping: "DefaultWrapping" ,AllowPerCharacterWrapping: "AllowPerCharacterWrapping" ,ETextWrappingPolicy_MAX: "ETextWrappingPolicy_MAX"};
export interface TextLayoutWidgetProps extends WidgetProps {
    ShapedTextOptions?: ShapedTextOptions;
    Justification?: number;
    WrappingPolicy?: ETextWrappingPolicy;
    AutoWrapText?: boolean;
    WrapTextAt?: number;
    Margin?: Margin;
    LineHeightPercentage?: number;
}

export class TextLayoutWidget extends React.Component<TextLayoutWidgetProps> {}

export interface MultiLineEditableTextProps extends TextLayoutWidgetProps {
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
    OnTextCommitted?: (Text: string, CommitMethod: number) => void;
}

export class MultiLineEditableText extends React.Component<MultiLineEditableTextProps> {}

export interface MultiLineEditableTextBoxProps extends TextLayoutWidgetProps {
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
    OnTextCommitted?: (Text: string, CommitMethod: number) => void;
}

export class MultiLineEditableTextBox extends React.Component<MultiLineEditableTextBoxProps> {}

export interface NamedSlotProps extends ContentWidgetProps {
}

export class NamedSlot extends React.Component<NamedSlotProps> {}

export interface NativeWidgetHostProps extends WidgetProps {
}

export class NativeWidgetHost extends React.Component<NativeWidgetHostProps> {}

export interface OverlayProps extends PanelWidgetProps {
}

export class Overlay extends React.Component<OverlayProps> {}

export interface ProgressBarStyle extends SlateWidgetStyle {
    BackgroundImage?: SlateBrush;
    FillImage?: SlateBrush;
    MarqueeImage?: SlateBrush;
}

export interface ProgressBarProps extends WidgetProps {
    WidgetStyle?: ProgressBarStyle;
    Percent?: number;
    BarFillType?: number;
    bIsMarquee?: boolean;
    BorderPadding?: Vector2D;
    PercentDelegate?: () => number;
    FillColorAndOpacity?: LinearColor;
    FillColorAndOpacityDelegate?: () => LinearColor;
}

export class ProgressBar extends React.Component<ProgressBarProps> {}

export interface RetainerBoxProps extends ContentWidgetProps {
    RenderOnInvalidation?: boolean;
    RenderOnPhase?: boolean;
    Phase?: number;
    PhaseCount?: number;
    TextureParameter?: string;
}

export class RetainerBox extends React.Component<RetainerBoxProps> {}

export interface RichTextBlockProps extends TextLayoutWidgetProps {
    Text?: string;
    bOverrideDefaultStyle?: boolean;
    DefaultTextStyleOverride?: TextBlockStyle;
    MinDesiredWidth?: number;
}

export class RichTextBlock extends React.Component<RichTextBlockProps> {}

export interface SafeZoneProps extends ContentWidgetProps {
    PadLeft?: boolean;
    PadRight?: boolean;
    PadTop?: boolean;
    PadBottom?: boolean;
}

export class SafeZone extends React.Component<SafeZoneProps> {}

export interface ScaleBoxProps extends ContentWidgetProps {
    Stretch?: number;
    StretchDirection?: number;
    UserSpecifiedScale?: number;
    IgnoreInheritedScale?: boolean;
}

export class ScaleBox extends React.Component<ScaleBoxProps> {}

export interface ScrollBarProps extends WidgetProps {
    WidgetStyle?: ScrollBarStyle;
    bAlwaysShowScrollbar?: boolean;
    bAlwaysShowScrollbarTrack?: boolean;
    Orientation?: number;
    Thickness?: Vector2D;
    Padding?: Margin;
}

export class ScrollBar extends React.Component<ScrollBarProps> {}

export interface ScrollBoxStyle extends SlateWidgetStyle {
    TopShadowBrush?: SlateBrush;
    BottomShadowBrush?: SlateBrush;
    LeftShadowBrush?: SlateBrush;
    RightShadowBrush?: SlateBrush;
}

export type EDescendantScrollDestination = "IntoView" | "TopOrLeft" | "Center" | "EDescendantScrollDestination_MAX";
export const EDescendantScrollDestination: {IntoView: "IntoView" ,TopOrLeft: "TopOrLeft" ,Center: "Center" ,EDescendantScrollDestination_MAX: "EDescendantScrollDestination_MAX"};
export interface ScrollBoxProps extends PanelWidgetProps {
    WidgetStyle?: ScrollBoxStyle;
    WidgetBarStyle?: ScrollBarStyle;
    Orientation?: number;
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

export class ScrollBox extends React.Component<ScrollBoxProps> {}

export interface SizeBoxProps extends ContentWidgetProps {
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

export class SizeBox extends React.Component<SizeBoxProps> {}

export interface SliderStyle extends SlateWidgetStyle {
    NormalBarImage?: SlateBrush;
    HoveredBarImage?: SlateBrush;
    DisabledBarImage?: SlateBrush;
    NormalThumbImage?: SlateBrush;
    HoveredThumbImage?: SlateBrush;
    DisabledThumbImage?: SlateBrush;
    BarThickness?: number;
}

export interface SliderProps extends WidgetProps {
    Value?: number;
    ValueDelegate?: () => number;
    MinValue?: number;
    MaxValue?: number;
    WidgetStyle?: SliderStyle;
    Orientation?: number;
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

export class Slider extends React.Component<SliderProps> {}

export interface SpacerProps extends WidgetProps {
    Size?: Vector2D;
}

export class Spacer extends React.Component<SpacerProps> {}

export interface SpinBoxStyle extends SlateWidgetStyle {
    BackgroundBrush?: SlateBrush;
    HoveredBackgroundBrush?: SlateBrush;
    ActiveFillBrush?: SlateBrush;
    InactiveFillBrush?: SlateBrush;
    ArrowsImage?: SlateBrush;
    ForegroundColor?: SlateColor;
    TextPadding?: Margin;
}

export interface SpinBoxProps extends WidgetProps {
    Value?: number;
    ValueDelegate?: () => number;
    WidgetStyle?: SpinBoxStyle;
    Delta?: number;
    SliderExponent?: number;
    Font?: SlateFontInfo;
    Justification?: number;
    MinDesiredWidth?: number;
    ClearKeyboardFocusOnCommit?: boolean;
    SelectAllTextOnCommit?: boolean;
    ForegroundColor?: SlateColor;
    OnValueChanged?: (InValue: number) => void;
    OnValueCommitted?: (InValue: number, CommitMethod: number) => void;
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

export class SpinBox extends React.Component<SpinBoxProps> {}

export interface TextBlockProps extends TextLayoutWidgetProps {
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

export class TextBlock extends React.Component<TextBlockProps> {}

export interface ThrobberProps extends WidgetProps {
    NumberOfPieces?: number;
    bAnimateHorizontally?: boolean;
    bAnimateVertically?: boolean;
    bAnimateOpacity?: boolean;
    Image?: SlateBrush;
}

export class Throbber extends React.Component<ThrobberProps> {}

export type EListItemAlignment = "EvenlyDistributed" | "EvenlySize" | "EvenlyWide" | "LeftAligned" | "RightAligned" | "CenterAligned" | "Fill" | "EListItemAlignment_MAX";
export const EListItemAlignment: {EvenlyDistributed: "EvenlyDistributed" ,EvenlySize: "EvenlySize" ,EvenlyWide: "EvenlyWide" ,LeftAligned: "LeftAligned" ,RightAligned: "RightAligned" ,CenterAligned: "CenterAligned" ,Fill: "Fill" ,EListItemAlignment_MAX: "EListItemAlignment_MAX"};
export interface TileViewProps extends ListViewProps {
    EntryHeight?: number;
    EntryWidth?: number;
    TileAlignment?: EListItemAlignment;
    bWrapHorizontalNavigation?: boolean;
}

export class TileView extends React.Component<TileViewProps> {}

export interface TreeViewProps extends ListViewProps {
}

export class TreeView extends React.Component<TreeViewProps> {}

export interface UniformGridPanelProps extends PanelWidgetProps {
    SlotPadding?: Margin;
    MinDesiredSlotWidth?: number;
    MinDesiredSlotHeight?: number;
}

export class UniformGridPanel extends React.Component<UniformGridPanelProps> {}

export interface VerticalBoxProps extends PanelWidgetProps {
}

export class VerticalBox extends React.Component<VerticalBoxProps> {}

export interface ViewportProps extends ContentWidgetProps {
    BackgroundColor?: LinearColor;
}

export class Viewport extends React.Component<ViewportProps> {}

export interface WidgetSwitcherProps extends PanelWidgetProps {
    ActiveWidgetIndex?: number;
}

export class WidgetSwitcher extends React.Component<WidgetSwitcherProps> {}

export interface WindowTitleBarAreaProps extends ContentWidgetProps {
    bWindowButtonsEnabled?: boolean;
    bDoubleClickTogglesFullscreen?: boolean;
}

export class WindowTitleBarArea extends React.Component<WindowTitleBarAreaProps> {}

export interface WrapBoxProps extends PanelWidgetProps {
    InnerSlotPadding?: Vector2D;
    WrapWidth?: number;
    bExplicitWrapWidth?: boolean;
}

export class WrapBox extends React.Component<WrapBoxProps> {}

export interface FrameNumber {
    Value?: number;
}

export interface FrameTime {
    FrameNumber?: FrameNumber;
    SubFrame?: number;
}

export interface FrameRate {
    Numerator?: number;
    Denominator?: number;
}

export interface QualifiedFrameTime {
    Time?: FrameTime;
    Rate?: FrameRate;
}

export interface LevelSequenceSnapshotSettings {
    ZeroPadAmount?: number;
    FrameRate?: FrameRate;
}

export interface MovieSceneSequenceID {
    Value?: number;
}

export interface LevelSequencePlayerSnapshot {
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

export interface LevelSequenceBurnInProps extends UserWidgetProps {
    FrameInformation?: LevelSequencePlayerSnapshot;
}

export class LevelSequenceBurnIn extends React.Component<LevelSequenceBurnInProps> {}

export interface SoftObjectPath {
    AssetPathName?: string;
    SubPathString?: string;
}

export interface PropertyViewBaseProps extends WidgetProps {
    SoftObjectPath?: SoftObjectPath;
    bAutoLoadAsset?: boolean;
    OnPropertyChanged?: (PropertyName: string) => void;
}

export class PropertyViewBase extends React.Component<PropertyViewBaseProps> {}

export interface DetailsViewProps extends PropertyViewBaseProps {
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

export class DetailsView extends React.Component<DetailsViewProps> {}

export interface SinglePropertyViewProps extends PropertyViewBaseProps {
    PropertyName?: string;
    NameOverride?: string;
}

export class SinglePropertyView extends React.Component<SinglePropertyViewProps> {}

export interface EditorUtilityWidgetProps extends UserWidgetProps {
    HelpText?: string;
    bAlwaysReregisterWithWindowsMenu?: boolean;
    bAutoRunDefaultAction?: boolean;
}

export class EditorUtilityWidget extends React.Component<EditorUtilityWidgetProps> {}

export interface ReactWidgetProps extends UserWidgetProps {
}

export class ReactWidget extends React.Component<ReactWidgetProps> {}

export interface TextureImageProps extends ImageProps {
    bMatchSize?: boolean;
    TextureName?: string;
}

export class TextureImage extends React.Component<TextureImageProps> {}


interface Root {
    removeFromViewport() : void;
    getWidget(): any;
}

interface TReactUMG {
    render(element: React.ReactElement) : Root;
    init(world: any) : void;
}

export var ReactUMG : TReactUMG;
