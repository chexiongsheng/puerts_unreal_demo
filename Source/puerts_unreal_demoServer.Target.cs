// Copyright 1998-2019 Epic Games, Inc. All Rights Reserved.

using UnrealBuildTool;
using System.Collections.Generic;

public class puerts_unreal_demoServerTarget : TargetRules
{
	public puerts_unreal_demoServerTarget( TargetInfo Target) : base(Target)
	{
		Type = TargetType.Server;

		ExtraModuleNames.AddRange( new string[] { "puerts_unreal_demo" } );

        bUseLoggingInShipping = true;
        bUseChecksInShipping = true;
    }
}
