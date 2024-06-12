// Copyright Epic Games, Inc. All Rights Reserved.

using UnrealBuildTool;
using System.Collections.Generic;

public class puerts_unreal_demoTarget : TargetRules
{
	public puerts_unreal_demoTarget(TargetInfo Target) : base(Target)
	{
		Type = TargetType.Game;
#if UE_5_4_OR_LATER
		DefaultBuildSettings = BuildSettingsVersion.V5;
		IncludeOrderVersion = EngineIncludeOrderVersion.Unreal5_4;
#endif
		ExtraModuleNames.Add("puerts_unreal_demo");
	}
}
