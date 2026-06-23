'use client';

// Camada interativa do dashboard. Recebe os dados já buscados no servidor
// (app/page.tsx) e cuida de abas, busca, ordenação e modal de detalhes.

import { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { AgentCard } from '@/components/AgentCard';
import { WeaponCard } from '@/components/WeaponCard';
import { MapCard } from '@/components/MapCard';
import { CollectionsGrid } from '@/components/CollectionsGrid';
import { SearchInput } from '@/components/SearchInput';
import { CollectionsFilter } from '@/components/CollectionsFilter';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Modal } from '@/components/Modal';
import { AgentDetail } from '@/components/AgentDetail';
import { WeaponDetail } from '@/components/WeaponDetail';
import { MapDetail } from '@/components/MapDetail';
import { BundleDetail } from '@/components/BundleDetail';
import { normalize, matchesQuery } from '@/utils/text';
import { bundleMatchesYear, listCollectionYears } from '@/utils/bundleClassifier';
import { Agent, Weapon, ValorantMap, Bundle, Contract, Tab, CollectionSort } from '@/types/valorant';

interface DashboardClientProps {
  agents: Agent[];
  weapons: Weapon[];
  maps: ValorantMap[];
  bundles: Bundle[];
  /** Mapa agente.uuid → contrato, pré-computado no servidor para lookup O(1). */
  agentContracts: Record<string, Contract>;
}

type SelectedItem =
  | { type: 'agent';      data: Agent }
  | { type: 'weapon';     data: Weapon }
  | { type: 'map';        data: ValorantMap }
  | { type: 'collection'; data: Bundle }
  | null;

const SORTERS: Record<CollectionSort, (a: Bundle, b: Bundle) => number> = {
  newest: (a, b) => b.releaseOrder - a.releaseOrder,
  oldest: (a, b) => a.releaseOrder - b.releaseOrder,
  az:     (a, b) => a.displayName.localeCompare(b.displayName, 'pt'),
  za:     (a, b) => b.displayName.localeCompare(a.displayName, 'pt'),
};

export function DashboardClient({ agents, weapons, maps, bundles, agentContracts }: DashboardClientProps) {
  const [activeTab, setActiveTab]       = useState<Tab>('agents');
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);

  // Queries independentes por aba
  const [agentQuery,      setAgentQuery]      = useState('');
  const [weaponQuery,     setWeaponQuery]     = useState('');
  const [mapQuery,        setMapQuery]        = useState('');
  const [collectionQuery, setCollectionQuery] = useState('');
  const [collectionSort,  setCollectionSort]  = useState<CollectionSort>('newest');
  const [collectionYear,  setCollectionYear]  = useState<number | null>(null);

  const collectionYears = useMemo(() => listCollectionYears(bundles), [bundles]);

  const filteredAgents = useMemo(() => {
    const q = normalize(agentQuery.trim());
    return q ? agents.filter((a) => matchesQuery(q, a.displayName)) : agents;
  }, [agents, agentQuery]);

  const filteredWeapons = useMemo(() => {
    const q = normalize(weaponQuery.trim());
    return q ? weapons.filter((w) => matchesQuery(q, w.displayName, w.shopData?.categoryText)) : weapons;
  }, [weapons, weaponQuery]);

  const filteredMaps = useMemo(() => {
    const q = normalize(mapQuery.trim());
    return q ? maps.filter((m) => matchesQuery(q, m.displayName)) : maps;
  }, [maps, mapQuery]);

  const filteredBundles = useMemo(() => {
    const q = normalize(collectionQuery.trim());
    const list = bundles.filter(
      (b) =>
        matchesQuery(q, b.displayName) &&
        (collectionYear === null || bundleMatchesYear(b, collectionYear))
    );
    return list.sort(SORTERS[collectionSort]);
  }, [bundles, collectionQuery, collectionSort, collectionYear]);

  return (
    <div className="min-h-screen bg-ground text-ink">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-6xl mx-auto px-6 py-10">

        {activeTab === 'agents' && (
          <section className="animate-fade-up">
            <SectionHeader title="Agentes" count={agents.length} />
            <SearchInput value={agentQuery} onChange={setAgentQuery}
              placeholder="Buscar agente por nome…"
              resultCount={filteredAgents.length} totalCount={agents.length} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.uuid} agent={agent}
                  onClick={(a) => setSelectedItem({ type: 'agent', data: a })} />
              ))}
            </div>
          </section>
        )}

        {activeTab === 'weapons' && (
          <section className="animate-fade-up">
            <SectionHeader title="Armas" count={weapons.length} />
            <SearchInput value={weaponQuery} onChange={setWeaponQuery}
              placeholder="Buscar arma por nome ou categoria…"
              resultCount={filteredWeapons.length} totalCount={weapons.length} />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredWeapons.map((weapon) => (
                <WeaponCard key={weapon.uuid} weapon={weapon}
                  onClick={(w) => setSelectedItem({ type: 'weapon', data: w })} />
              ))}
            </div>
          </section>
        )}

        {activeTab === 'maps' && (
          <section className="animate-fade-up">
            <SectionHeader title="Mapas" count={maps.length} />
            <SearchInput value={mapQuery} onChange={setMapQuery}
              placeholder="Buscar mapa por nome…"
              resultCount={filteredMaps.length} totalCount={maps.length} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredMaps.map((map) => (
                <MapCard key={map.uuid} map={map}
                  onClick={(m) => setSelectedItem({ type: 'map', data: m })} />
              ))}
            </div>
          </section>
        )}

        {activeTab === 'collections' && (
          <section className="animate-fade-up">
            <SectionHeader title="Coleções" count={bundles.length} />
            <CollectionsFilter
              query={collectionQuery} onQueryChange={setCollectionQuery}
              sort={collectionSort}   onSortChange={setCollectionSort}
              years={collectionYears} year={collectionYear} onYearChange={setCollectionYear}
              resultCount={filteredBundles.length} totalCount={bundles.length}
            />
            <CollectionsGrid
              bundles={filteredBundles}
              onSelect={(b) => setSelectedItem({ type: 'collection', data: b })}
            />
          </section>
        )}

      </main>

      <Modal isOpen={selectedItem !== null} onClose={() => setSelectedItem(null)}>
        {selectedItem?.type === 'agent' && (
          <AgentDetail agent={selectedItem.data} contract={agentContracts[selectedItem.data.uuid]} />
        )}
        {selectedItem?.type === 'weapon' && <WeaponDetail weapon={selectedItem.data} />}
        {selectedItem?.type === 'map' && <MapDetail map={selectedItem.data} />}
        {selectedItem?.type === 'collection' && <BundleDetail bundle={selectedItem.data} />}
      </Modal>
    </div>
  );
}
