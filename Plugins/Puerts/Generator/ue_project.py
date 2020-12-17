# -*- coding: utf-8 -*

import xml.etree.ElementTree as ET
import re
import os

class UEProj:
    def __init__(self, vcxproj_path):
        tree = ET.parse(vcxproj_path)
        root = tree.getroot()
        m = re.match('\{(.*)\}', root.tag)
        namespaces = {'ns': m.group(1) if m else ''}
        NMakeIncludeSearchPath = ""
        NMakePreprocessorDefinitions = ""
        include_search_paths = root.find('ns:PropertyGroup/ns:NMakeIncludeSearchPath', namespaces).text.replace('$(NMakeIncludeSearchPath)', NMakeIncludeSearchPath)
        preprocessor_definitions = root.find('ns:PropertyGroup/ns:NMakePreprocessorDefinitions', namespaces).text.replace('$(NMakePreprocessorDefinitions)', NMakePreprocessorDefinitions)

        compile_args = ["-xc++",
                        "-std=c++14",
                        "-stdlib=libc++",
                        "-Wc++14-extensions",
                        "-Wunknown-attributes",
                        "-Wmacro-redefined",
                        "-Wmissing-declarations",
                        "-Wignored-pragmas",
                        "-Wnonportable-include-path",
                        "-ferror-limit=0"]

        include_search_path_list = filter(bool, include_search_paths.split(';'))
        
        found_ue4_dir = None
        for include_search_path in include_search_path_list:
            m = re.match('(.*UE_4.\d\d)\\\\Engine', include_search_path)
            if m :
                found_ue4_dir = m.group(1)
                break

        preprocessor_definition_list = filter(bool, preprocessor_definitions.split(';'))
        self.compile_args = compile_args + map(lambda x:"-I" + x, include_search_path_list) + map(lambda x:"-D" + x, preprocessor_definition_list)
        self.engine_dir = found_ue4_dir

    