import { SharedFieldBuilder } from '~/fields/SharedFieldBuilder';
import {
  IsFileRule,
  IsFileTypeRule,
  MinFilesRule,
  MaxFilesRule,
  MinFileSizeRule,
  MaxFilesSizeRule,
} from '~/rules/file';
import { BuilderFieldOptions } from '~/types';

export class FileFieldBuilder extends SharedFieldBuilder<File[]> {
  constructor({ message, name }: BuilderFieldOptions = {}) {
    super(name || 'defaultFileName', 'file');
    this.addRule(new IsFileRule(message));
  }

  /**
   * Adds a rule that the number of files must be at least the specified minimum.
   */
  minFiles(min: number, message?: string) {
    this.addRule(new MinFilesRule(min, message));
    return this;
  }

  /**
   * Adds a rule that the number of files must not exceed the specified maximum.
   */
  maxFiles(max: number, message?: string) {
    this.addRule(new MaxFilesRule(max, message));
    return this;
  }

  /**
   * Adds a rule that the file size must be at least the specified minimum size.
   */
  minFileSize(minSize: number, message?: string) {
    this.addRule(new MinFileSizeRule(minSize, message));
    return this;
  }

  /**
   * Adds a rule that the total file size must not exceed the specified maximum size.
   */
  maxFilesSize(maxSize: number, message?: string) {
    this.addRule(new MaxFilesSizeRule(maxSize, message));
    return this;
  }

  /**
   *  Adds a rule that the file type must match the specified allowed types.
   */
  fileType(allowedTypes: string[], message?: string) {
    this.addRule(new IsFileTypeRule(allowedTypes, message));
    return this;
  }

  build() {
    return super.build();
  }
}
