// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include <string>

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "TGUnitTestCallee.generated.h"

USTRUCT(BlueprintType)
struct FCustomStruct
{
public:
	GENERATED_USTRUCT_BODY()

public:

	FCustomStruct()
	{
		UE_LOG(LogTemp, Warning, TEXT("FCustomStruct1(%p)"), this);
	}

	FCustomStruct( const FCustomStruct &obj)
	{
		UE_LOG(LogTemp, Warning, TEXT("FCustomStruct2(%p)"), this);
	}

	FCustomStruct( FCustomStruct &&obj)
	{
		UE_LOG(LogTemp, Warning, TEXT("FCustomStruct3(%p)"), this);
	}
	
	FCustomStruct &operator =(const FCustomStruct &obj)
	{
		UE_LOG(LogTemp, Warning, TEXT("operator =(%p)"), this);
		return *this;
	}

	~FCustomStruct()
	{
		UE_LOG(LogTemp, Warning, TEXT("~FCustomStruct(%p)"), this);
	}
};

/**
 * 
 */
UCLASS()
class PUERTS_UNREAL_DEMO_API UTGUnitTestCallee : public UObject
{
	GENERATED_BODY()

public:
    UFUNCTION(BlueprintCallable, Category = "Puerts|TestCase")
    void NoArgNoRet();

    UFUNCTION(BlueprintCallable, Category = "Puerts|TestCase")
    int RetInt();

    UFUNCTION(BlueprintCallable, Category = "Puerts|TestCase")
    int IntArgIntRet(int Arg);

    UFUNCTION(BlueprintCallable, Category = "Puerts|TestCase")
    int StrArgIntRet(FString Str);

	UFUNCTION(BlueprintCallable, Category = "Puerts|TestCase")
	int TArrayRefIntRet(TArray<FVector>& Data);

	UFUNCTION(BlueprintCallable, Category = "Puerts|TestCase")
	int ConstTArrayRefIntRet(const TArray<FVector>& Data);

	UFUNCTION(BlueprintCallable, Category = "Puerts|TestCase")
	TArray<int> TArrayRet();

	UFUNCTION(BlueprintCallable, Category = "Puerts|TestCase")
	void CustomStructRefNoRet(FCustomStruct& Data);
    
    void IntRef(int& A) const
    {
        A = 10;
    }
    
    void IntPtr(int* A) const
    {
        *A = 11;
    }
    
    void StdStringRef(std::string& A) const
    {
        A = "A";
    }
    
    void StdStringPtr(std::string* A) const
    {
        *A = "Z";
    }

    UPROPERTY()
    FVector VP;
};
