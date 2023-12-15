import {
    apply, applyTemplates,
    chain, mergeWith, move,
    Rule, SchematicContext,
    Tree, url
} from '@angular-devkit/schematics';
import {Schema} from "./schema";
import {strings} from "@angular-devkit/core";
import {dotslash} from "../utils/utils";

export function _new(_options: Schema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        let rules: any;
        rules =  [create(_options)]
        return chain(rules)(tree, _context);
    };
    function create(_options: Schema) {
        return (_context: SchematicContext) => {
            const transformedSource = apply(url(`./files`), [
                applyTemplates({
                    classify: strings.classify,
                    dotslash: dotslash,
                    dasherize: strings.dasherize,
                    name: _options.name,
                    group: _options.group
                }),
                move(`${_options.name}`)]);
            return mergeWith(transformedSource);
        };
    }

}
