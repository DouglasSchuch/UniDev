[Files]
Source: "syneco-planning\dist\syneco-planning\*"; DestDir: "{app}\Client"; Flags: ignoreversion recursesubdirs; Components: SynecoPlanningClient
Source: "syneco-planning\libs_iis\rewrite_amd64_en-US.msi"; DestDir: "{app}\Client\libs_iis"; Flags: ignoreversion recursesubdirs; Components: SynecoPlanningClient
Source: "syneco-planning\libs_iis\web.config"; DestDir: "{app}\Client"; Flags: ignoreversion recursesubdirs; Components: SynecoPlanningClient
Source: "syneco-planning-api\dist\.env"; DestDir: "{app}\Server"; Flags: onlyifdoesntexist uninsneveruninstall; Components: SynecoPlanningServer
Source: "syneco-planning-api\dist\bcrypt_lib.node"; DestDir: "{app}\Server"; Flags: ignoreversion ; Components: SynecoPlanningServer
Source: "syneco-planning-api\dist\SynecoPlanningAPI.exe"; DestDir: "{app}\Server"; Flags: ignoreversion recursesubdirs; Components: SynecoPlanningServer
Source: "syneco-planning-api\iconSyneco.ico"; DestDir: "{app}\Server"; Flags: ignoreversion recursesubdirs; Components: SynecoPlanningServer
Source: "syneco-planning-api\service\nssm.exe"; DestDir: "{app}\Server"; Flags: ignoreversion recursesubdirs; Components: SynecoPlanningServer


[Icons]
Name: "{group}\Syneco Planning Server"; Filename: "{app}\Server\SynecoPlanningAPI.exe"; WorkingDir: "{app}\Server"; IconFilename: "{app}\Server\iconSyneco.ico"; Components: SynecoPlanningServer
Name: "{group}\Uninstall"; Filename: "{uninstallexe}"; Components: SynecoPlanningServer
Name: "{commondesktop}\Syneco Planning Server"; Filename: "{app}\Server\SynecoPlanningAPI.exe"; WorkingDir: "{app}\Server"; IconFilename: "{app}\Server\iconSyneco.ico"; Components: SynecoPlanningServer

[Run]
Filename: "msiexec.exe"; Parameters: "/i ""{app}\Client\libs_iis\rewrite_amd64_en-US.msi"" /qb"; Components: SynecoPlanningClient; StatusMsg: "Instalando modulo do IIS...Rewrite"
Filename: "{win}\system32\inetsrv\AppCmd"; Parameters: "add site -name:SynecoPlanning  -bindings:http/*:89: -physicalPath:""{app}\Client"""; Components: SynecoPlanningClient; StatusMsg: "Instalando site no IIS..."

Filename: "{app}\Server\nssm.exe"; Parameters: "install ""Syneco Planning Server"" ""{app}\Server\SynecoPlanningAPI.exe"""; Components: SynecoPlanningServer; StatusMsg: "Instalando servi�o do planning (install)..."
Filename: "{app}\Server\nssm.exe"; Parameters: "set ""Syneco Planning Server"" DisplayName ""Syneco Planning Server"""; Components: SynecoPlanningServer; StatusMsg: "Instalando servi�o do planning (set name)..."
Filename: "{app}\Server\nssm.exe"; Parameters: "set ""Syneco Planning Server"" AppNoConsole 1"; Components: SynecoPlanningServer; StatusMsg: "Instalando servi�o do planning (console)..."
Filename: "{app}\Server\nssm.exe"; Parameters: "set ""Syneco Planning Server"" AppStdout ""{app}\Server\Logs\SynecoLicensesOut.log"""; Components: SynecoPlanningServer; StatusMsg: "Instalando servi�o do planning (out file)..."
Filename: "{app}\Server\nssm.exe"; Parameters: "set ""Syneco Planning Server"" AppStderr ""{app}\Server\Logs\SynecoLicensesErr.log"""; Components: SynecoPlanningServer; StatusMsg: "Instalando servi�o do planning (err file)..."
Filename: "{app}\Server\nssm.exe"; Parameters: "set ""Syneco Planning Server"" Start SERVICE_AUTO_START"; Components: SynecoPlanningServer; StatusMsg: "Instalando servi�o do planning (start mode)..."
Filename: "{app}\Server\nssm.exe"; Parameters: "start ""Syneco Planning Server"""; Components: SynecoPlanningServer; StatusMsg: "Instalando servi�o do planning (starting)..."

[UninstallRun]
Filename: "{app}\Server\nssm.exe"; Parameters: "stop ""Syneco Planning Server"""; Components: SynecoPlanningServer; StatusMsg: "Parando servi�o do planning (removing)..."
Filename: "{app}\Server\nssm.exe"; Parameters: "remove ""Syneco Planning Server"" confirm"; Components: SynecoPlanningServer; StatusMsg: "Removendo servi�o do planning (removing)..."
Filename: "{win}\system32\inetsrv\AppCmd"; Parameters: "stop site SynecoPlanning"; Components: SynecoPlanningClient
Filename: "{win}\system32\inetsrv\AppCmd"; Parameters: "delete SITE SynecoPlanning"; Components: SynecoPlanningClient

[Setup]
AppName=Syneco Planning
AppVersion=44.4.1
AppCopyright=SKA Automa��o de Engenharias
AppId={{55403023-16D9-4F3B-9A01-5EFA4BC704C5}
RestartIfNeededByRun=False
SetupIconFile=syneco-planning\src\assets\icons\iconSyneco.ico
AllowUNCPath=False
EnableDirDoesntExistWarning=True
UsePreviousGroup=False
AppendDefaultGroupName=False
UninstallDisplayName=Syneco Planning
DefaultDirName={pf}\SKA\SynecoPlanning
DefaultGroupName=Syneco Planning
OutputBaseFilename=SynecoPlanningSetup
LanguageDetectionMethod=locale

[Components]
;Name: "SynecoWebClient"; Description: "Install web client UI to access in the browser"; Types: SynecoWebClient All
;Name: "SynecoWebServer"; Description: "Install web service API"; Types: SynecoWebServer All
Name: "SynecoPlanningClient"; Description: "Install planning client UI to access in the browser"; Types: All
Name: "SynecoPlanningServer"; Description: "Install planning service API"; Types: All

[Types]
;Name: "SynecoWebClient"; Description: "Install Syneco Web Client"
;Name: "SynecoWebServer"; Description: "Install Syneco Web Server"
Name: "All"; Description: "Install Syneco Planning Server and Syneco Planning Client"

[Code]
/////////////////////////////////////////////////////////////////////
function GetUninstallString(): String;
var
  sUnInstPath: String;
  sUnInstallString: String;
begin
  sUnInstPath := ExpandConstant('Software\Microsoft\Windows\CurrentVersion\Uninstall\{#emit SetupSetting("AppId")}_is1');
  sUnInstallString := '';
  if not RegQueryStringValue(HKLM, sUnInstPath, 'UninstallString', sUnInstallString) then
    RegQueryStringValue(HKCU, sUnInstPath, 'UninstallString', sUnInstallString);
  Result := sUnInstallString;
end;

/////////////////////////////////////////////////////////////////////
function IsUpgrade(): Boolean;
begin
  Result := (GetUninstallString() <> '');
end;

/////////////////////////////////////////////////////////////////////
function UnInstallOldVersion(): Integer;
var
  sUnInstallString: String;
  iResultCode: Integer;
begin
// Return Values:
// 1 - uninstall string is empty
// 2 - error executing the UnInstallString
// 3 - successfully executed the UnInstallString

  // default return value
  Result := 0;

  // get the uninstall string of the old app
  sUnInstallString := GetUninstallString();
  if sUnInstallString <> '' then begin
    sUnInstallString := RemoveQuotes(sUnInstallString);
    if Exec(sUnInstallString, '/SILENT /NORESTART /SUPPRESSMSGBOXES','', SW_HIDE, ewWaitUntilTerminated, iResultCode) then
      Result := 3
    else
      Result := 2;
  end else
    Result := 1;
end;

/////////////////////////////////////////////////////////////////////
procedure CurStepChanged(CurStep: TSetupStep);
begin
  if (CurStep=ssInstall) then
  begin
    if (IsUpgrade()) then
    begin
      UnInstallOldVersion();
    end;
  end;
end;

/////////////////////////////////////////////////////////////////////
function FileNotExists(FileName: String):Boolean;
begin
   Result:= not FileExists(FileName);
end;         
/////////////////////////////////////////////////////////////////////