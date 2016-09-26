export class Project {
  id: number;
  repo_name: string;
  num_of_user_stories: number;

  constructor(info: Object) {
    this.id = info["id"];
    this.repo_name = info["repo_name"];
    this.num_of_user_stories = info["num_of_user_stories"];
  }
}
