import { TreeAdjList } from "../types";

class TreeNode {
  val: string;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val: string) { this.val = val; }
}

export class TreeRepository {

  private buildTree(adj: TreeAdjList): TreeNode {
    const nodes: Record<string, TreeNode> = {};
    const children = new Set<string>();

    for (const key of Object.keys(adj)) {
      if (!nodes[key]) nodes[key] = new TreeNode(key);
      const [left, right] = adj[key] ?? [];

      if (left) {
        if (!nodes[left]) nodes[left] = new TreeNode(left);
        nodes[key].left = nodes[left];
        children.add(left);
      }
      if (right) {
        if (!nodes[right]) nodes[right] = new TreeNode(right);
        nodes[key].right = nodes[right];
        children.add(right);
      }
    }

    const root = Object.keys(nodes).find(k => !children.has(k));
    if (!root) throw new Error("Invalid tree: root node not found");
    return nodes[root];
  }

  // Returns a flat string[] so the route's res.json({ arr: repo.inorder(adj) })
  // produces { arr: ["4","2","5","1","3"] } — exactly what fetchSteps().arr gives
  // to player.load, which requires a plain array.

  inorder(adj: TreeAdjList): string[] {
    const root = this.buildTree(adj);
    const arr: string[] = [];

    const traverse = (node: TreeNode | null): void => {
      if (!node) return;
      traverse(node.left);
      arr.push(node.val);
      traverse(node.right);
    };

    traverse(root);
    return arr;
  }

  preorder(adj: TreeAdjList): string[] {
    const root = this.buildTree(adj);
    const arr: string[] = [];

    const traverse = (node: TreeNode | null): void => {
      if (!node) return;
      arr.push(node.val);
      traverse(node.left);
      traverse(node.right);
    };

    traverse(root);
    return arr;
  }

  postorder(adj: TreeAdjList): string[] {
    const root = this.buildTree(adj);
    const arr: string[] = [];

    const traverse = (node: TreeNode | null): void => {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      arr.push(node.val);
    };

    traverse(root);
    return arr;
  }
}