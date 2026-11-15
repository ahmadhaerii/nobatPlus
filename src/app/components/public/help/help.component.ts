import { Component, OnInit } from "@angular/core";
import { HelpApiService } from "src/app/api/help-api.service";
import HelpDM from "src/app/store/dataModels/helpDM";

@Component({
  selector: "bp-help",
  templateUrl: "./help.component.html",
  styleUrls: ["./help.component.scss"],
})
export class HelpComponent implements OnInit {
  items: HelpDM[] = [];
  filtered: HelpDM[] = [];

  query = "";
  openId: number | string | null = null;
  loading = false;

  constructor(private helpApiService: HelpApiService) {}
  ngOnInit(): void {
    this.load();
  }

  async load(): Promise<void> {
    this.loading = true;
    try {
      this.items = await this.helpApiService.getList();
      this.applyFilter();
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }

  onSearch(value: string): void {
    this.query = value;
    this.applyFilter();
  }

  toggle(item: HelpDM): void {
    this.openId = this.openId === item.id ? null : item.id;
  }

  trackById(_: number, item: HelpDM) {
    return item.id;
  }

  private applyFilter(): void {
    const q = this.normalize(this.query);
    this.filtered = q
      ? this.items.filter(
          (i) =>
            this.normalize(i.title).includes(q) ||
            this.normalize(i.description).includes(q),
        )
      : [...this.items];
    if (!this.filtered.some((i) => i.id === this.openId)) {
      this.openId = null;
    }
  }

  private normalize(text: string): string {
    return (text || "")
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .replace(/\u200c/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }
}
