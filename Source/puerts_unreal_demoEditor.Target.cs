// Copyright Epic Games, Inc. All Rights Reserved.

using UnrealBuildTool;
using System.Collections.Generic;

public class puerts_unreal_demoEditorTarget : TargetRules
{
	public puerts_unreal_demoEditorTarget( TargetInfo Target) : base(Target)
	{
		Type = TargetType.Editor;
#if UE_5_7_OR_LATER
        DefaultBuildSettings = BuildSettingsVersion.V6;
        IncludeOrderVersion = EngineIncludeOrderVersion.Unreal5_7;
#elif UE_5_4_OR_LATER
		DefaultBuildSettings = BuildSettingsVersion.V5;
		IncludeOrderVersion = EngineIncludeOrderVersion.Unreal5_4;
#endif
        ExtraModuleNames.Add("puerts_unreal_demo");
	}
}
