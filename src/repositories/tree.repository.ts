import { TreeAdjList } from "../types";

class TreeNode {
  val: string;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val: string) {
    this.val = val;
  }
}

export class TreeRepository {
  private buildTree(adj: TreeAdjList): TreeNode {
    const nodes: Record<string, TreeNode> = {};
    const children = new Set<string>();

    for (const key of Object.keys(adj)) {
      if (!nodes[key]) nodes[key] = new TreeNode(key);
      const [left, right] = adj[key] || [];

      if (left !== null && left !== "") {
        if (!nodes[left]) nodes[left] = new TreeNode(left);
        nodes[key].left = nodes[left];
        children.add(left);
      }
      if (right !== null && right !== "") {
        if (!nodes[right]) nodes[right] = new TreeNode(right);
        nodes[key].right = nodes[right];
        children.add(right);
      }
    }

    let root: TreeNode | null = null;
    for (const key of Object.keys(nodes)) {
      if (!children.has(key)) {
        root = nodes[key];
        break;
      }
    }

    if (!root) throw new Error("Invalid tree: root not found");
    return root;
  }

  inorder(adj: TreeAdjList): string[] {
    const root = this.buildTree(adj);
    const steps: string[] = [];
    const traverse = (node: TreeNode | null): void => {
      if (!node) return;
      traverse(node.left);
      steps.push(node.val);
      traverse(node.right);
    };
    traverse(root);
    return steps;
  }

  preorder(adj: TreeAdjList): string[] {
    const root = this.buildTree(adj);
    const steps: string[] = [];
    const traverse = (node: TreeNode | null): void => {
      if (!node) return;
      steps.push(node.val);
      traverse(node.left);
      traverse(node.right);
    };
    traverse(root);
    return steps;
  }

  postorder(adj: TreeAdjList): string[] {
    const root = this.buildTree(adj);
    const steps: string[] = [];
    const traverse = (node: TreeNode | null): void => {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      steps.push(node.val);
    };
    traverse(root);
    return steps;
  }
}
