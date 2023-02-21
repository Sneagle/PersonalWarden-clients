import { VaultFilter } from "@personalwarden/angular/vault/vault-filter/models/vault-filter.model";
import { VaultFilterService as BaseVaultFilterService } from "@personalwarden/angular/vault/vault-filter/services/vault-filter.service";
import { CollectionService } from "@personalwarden/common/abstractions/collection.service";
import { OrganizationService } from "@personalwarden/common/abstractions/organization/organization.service.abstraction";
import { PolicyService } from "@personalwarden/common/abstractions/policy/policy.service.abstraction";
import { StateService } from "@personalwarden/common/abstractions/state.service";
import { CipherService } from "@personalwarden/common/vault/abstractions/cipher.service";
import { FolderService } from "@personalwarden/common/vault/abstractions/folder/folder.service.abstraction";
import { CipherView } from "@personalwarden/common/vault/models/view/cipher.view";

export class VaultFilterService extends BaseVaultFilterService {
  vaultFilter: VaultFilter = new VaultFilter();

  allVaults = "allVaults";
  myVault = "myVault";

  constructor(
    stateService: StateService,
    organizationService: OrganizationService,
    folderService: FolderService,
    cipherService: CipherService,
    collectionService: CollectionService,
    policyService: PolicyService
  ) {
    super(
      stateService,
      organizationService,
      folderService,
      cipherService,
      collectionService,
      policyService
    );
    this.vaultFilter.myVaultOnly = false;
    this.vaultFilter.selectedOrganizationId = null;
  }

  getVaultFilter() {
    return this.vaultFilter;
  }

  setVaultFilter(filter: string) {
    if (filter === this.allVaults) {
      this.vaultFilter.myVaultOnly = false;
      this.vaultFilter.selectedOrganizationId = null;
    } else if (filter === this.myVault) {
      this.vaultFilter.myVaultOnly = true;
      this.vaultFilter.selectedOrganizationId = null;
    } else {
      this.vaultFilter.myVaultOnly = false;
      this.vaultFilter.selectedOrganizationId = filter;
    }
  }

  clear() {
    this.setVaultFilter(this.allVaults);
  }

  filterCipherForSelectedVault(cipher: CipherView) {
    if (!this.vaultFilter.selectedOrganizationId && !this.vaultFilter.myVaultOnly) {
      return false;
    }
    if (this.vaultFilter.selectedOrganizationId) {
      if (cipher.organizationId === this.vaultFilter.selectedOrganizationId) {
        return false;
      }
    } else if (this.vaultFilter.myVaultOnly) {
      if (!cipher.organizationId) {
        return false;
      }
    }
    return true;
  }
}
