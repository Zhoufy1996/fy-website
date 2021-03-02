/** @format */

import { routerModel } from '.';
import homeRoutes from '../../pages/home/routes';
import loginRoutes from '../../pages/login/routes';

const routes: routerModel[] = [...homeRoutes, ...loginRoutes].sort((l) => {
    if (l.redirect) {
        return 1;
    }
    return -1;
});

interface NullTree {
    children?: (NullTree | null)[];
}

type NullTreeArr = (NullTree | null)[];

interface Tree {
    children?: Tree[];
}

type TreeArr = Tree[];

interface Obj {
    [key: string]: any;
}

const removeChildren = (obj: Obj): Omit<Obj, 'children'> => {
    const result: any = {};
    Object.keys(obj).forEach((key) => {
        if (key !== 'children') {
            result[key] = obj[key];
        }
    });

    return result;
};

const treeFilterNull = (treeArr: NullTreeArr): TreeArr => {
    const filterChildrenNull = (tree: NullTree): Tree => {
        if (tree.children) {
            const children = tree.children
                .filter((item) => item != null)
                .map((item) => filterChildrenNull(item as NullTree));
            if (children.length === 0) {
                return removeChildren(tree) as Tree;
            }
            return {
                ...tree,
                children,
            };
        }
        return tree as Tree;
    };

    return treeArr.filter((item) => item != null).map((item) => filterChildrenNull(item as NullTree));
};

const getRoutes = (isLogin: boolean) => {
    window.console.log(isLogin);
    if (isLogin) {
        return routes;
    }

    const filterNotAuthRoutes = (route: routerModel): routerModel | null => {
        if (route.shouldLogin) {
            return null;
        }

        if (route.children) {
            return {
                ...route,
                children: route.children.map((item) => filterNotAuthRoutes(item)) as routerModel[],
            };
        }

        return route;
    };
    const result = treeFilterNull(routes.map(filterNotAuthRoutes)) as routerModel[];
    return result;
};
export default getRoutes;
