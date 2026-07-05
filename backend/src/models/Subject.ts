export abstract class Subject {
  abstract readonly code: string;
  abstract readonly name: string;


  public classifyScore(score: number | null | undefined): 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4' | 'No Score' {
    if (score === null || score === undefined || isNaN(score)) return 'No Score';
    if (score >= 8.0) return 'Level 1';
    if (score >= 6.0) return 'Level 2';
    if (score >= 4.0) return 'Level 3';
    return 'Level 4';
  }

  public static getLevelLabel(level: string): string {
    switch (level) {
      case 'Level 1': return '≥ 8.0 điểm';
      case 'Level 2': return '6.0 đến < 8.0 điểm';
      case 'Level 3': return '4.0 đến < 6.0 điểm';
      case 'Level 4': return '< 4.0 điểm';
      default: return 'Không có điểm';
    }
  }
}

export class MathSubject extends Subject {
  readonly code = 'toan';
  readonly name = 'Toán';
  readonly category = 'compulsory';
}

export class LiteratureSubject extends Subject {
  readonly code = 'ngu_van';
  readonly name = 'Ngữ văn';
  readonly category = 'compulsory';
}

export class ForeignLanguageSubject extends Subject {
  readonly code = 'ngoai_ngu';
  readonly name = 'Ngoại ngữ';
  readonly category = 'compulsory';
}

export class PhysicsSubject extends Subject {
  readonly code = 'vat_li';
  readonly name = 'Vật lí';
  readonly category = 'natural_science';
}

export class ChemistrySubject extends Subject {
  readonly code = 'hoa_hoc';
  readonly name = 'Hóa học';
  readonly category = 'natural_science';
}

export class BiologySubject extends Subject {
  readonly code = 'sinh_hoc';
  readonly name = 'Sinh học';
  readonly category = 'natural_science';
}

export class HistorySubject extends Subject {
  readonly code = 'lich_su';
  readonly name = 'Lịch sử';
  readonly category = 'social_science';
}

export class GeographySubject extends Subject {
  readonly code = 'dia_li';
  readonly name = 'Địa lí';
  readonly category = 'social_science';
}

export class CivicsSubject extends Subject {
  readonly code = 'gdcd';
  readonly name = 'GDCD';
  readonly category = 'social_science';
}

export class SubjectManager {
  private static instance: SubjectManager;
  private subjects: Map<string, Subject>;

  private constructor() {
    this.subjects = new Map<string, Subject>();
    this.registerSubject(new MathSubject());
    this.registerSubject(new LiteratureSubject());
    this.registerSubject(new ForeignLanguageSubject());
    this.registerSubject(new PhysicsSubject());
    this.registerSubject(new ChemistrySubject());
    this.registerSubject(new BiologySubject());
    this.registerSubject(new HistorySubject());
    this.registerSubject(new GeographySubject());
    this.registerSubject(new CivicsSubject());
  }

  public static getInstance(): SubjectManager {
    if (!SubjectManager.instance) {
      SubjectManager.instance = new SubjectManager();
    }
    return SubjectManager.instance;
  }

  private registerSubject(subject: Subject) {
    this.subjects.set(subject.code, subject);
  }

  public getSubject(code: string): Subject | undefined {
    return this.subjects.get(code);
  }

  public getAllSubjects(): Subject[] {
    return Array.from(this.subjects.values());
  }

}
