import type { IDocument } from "@/commons/types";
import { createGenericService } from "./generic-service";

const documentURL = "/documents";
const DocumentService = createGenericService<IDocument>(documentURL);
export default DocumentService;